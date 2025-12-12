// 変数の初期化
let requestSocket = null;
let responseSocket = null;
let requestIdCounter = 0;
const pendingRequests = new Map();
const TIMEOUT_MS = 10000; // タイムアウト時間 (ms)

// DOM要素の取得
const sendButton = document.getElementById('sendButton');
const clearButton = document.getElementById('clearButton');

// 問 1: WebSocket サーバに文字列データを含むリクエストメッセージを送信する関数
const sendRequest = (body) =>
  new Promise((resolve, reject) => {
    // WebSocket 接続がなければ新規作成
    if (!requestSocket || requestSocket.readyState !== WebSocket.OPEN) {
      requestSocket = new WebSocket('ws://localhost:3003');

      requestSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        // 一定時間内にレスポンスを受信したら、Promise を resolve する
        if (message.type === 'response') {
          const pending = pendingRequests.get(message.requestId);
          if (pending) {
            clearTimeout(pending.timeoutId);
            pendingRequests.delete(message.requestId);
            pending.resolve(message.body);
          }
        }
      };

      requestSocket.onclose = requestSocket.onerror = () => {
        pendingRequests.forEach((p) => {
          clearTimeout(p.timeoutId);
          p.reject(new Error('WebSocket connection closed'));
        });
        pendingRequests.clear();
        requestSocket = null;
      };
    }
    // 一意なリクエストIDを生成
    const requestId = requestIdCounter++;

    // 一定時間経過時にタイムアウトし、Promise が reject する。
    const timeoutId = setTimeout(() => {
      pendingRequests.delete(requestId);
      reject(new Error('Request timeout'));
    }, TIMEOUT_MS);

    pendingRequests.set(requestId, { resolve, reject, timeoutId });

    const message = JSON.stringify({ type: 'request', requestId, body });
    const sendMessage = () => {
      if (requestSocket.readyState === WebSocket.OPEN)
        requestSocket.send(message);
      else if (requestSocket.readyState === WebSocket.CONNECTING)
        // 接続中の場合は 100ms 後に再試行
        setTimeout(sendMessage, 100);
      else {
        // それ以外の状態ならリクエストを reject する
        clearTimeout(timeoutId);
        pendingRequests.delete(requestId);
        reject(new Error('WebSocket is not connected'));
      }
    };
    sendMessage();
  });

// 問 2: レスポンス用のWebSocket接続を初期化
const initializeResponder = () => {
  // WebSocket がOPEN状態ならアーリーリターン
  if (responseSocket?.readyState === WebSocket.OPEN) return;

  // レスポンス用のWebSocket接続を初期化
  responseSocket = new WebSocket('ws://localhost:3003');
  responseSocket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    // リクエスト本文に"Hello, "を付加してレスポンスを送信
    if (message.type === 'request') {
      responseSocket.send(
        JSON.stringify({
          type: 'response',
          requestId: message.requestId,
          body: 'Hello, ' + message.body,
        })
      );
    }
  };
  responseSocket.onclose = responseSocket.onerror = () => {
    responseSocket = null;
  };
};

initializeResponder();

sendButton.addEventListener('click', async () => {
  sendButton.disabled = true;

  const requests = [1, 2, 3, 4].map((i) => ({
    input: document.getElementById(`request${i}`),
    result: document.getElementById(`result${i}`),
  }));

  // sendRequest を並行して同時に実行
  await Promise.all(
    requests
      .filter((req) => req.input.value.trim())
      .map(async (req) => {
        const body = req.input.value.trim();
        req.result.className = 'result pending';
        req.result.textContent = '送信中...';

        try {
          const response = await sendRequest(body);
          req.result.className = 'result success';
          req.result.textContent = `OK: ${response}`;
        } catch (error) {
          req.result.className = 'result error';
          req.result.textContent = `Error: ${error.message}`;
        }
      })
  );

  sendButton.disabled = false;
});

clearButton.addEventListener('click', () => {
  document.querySelectorAll('.result').forEach((result) => {
    result.className = 'result';
    result.textContent = '';
  });
});
