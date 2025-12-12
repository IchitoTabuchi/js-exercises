// DOM要素
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// 固定設定
const SERVER_URL = 'http://localhost:11434';
const MODEL_NAME = 'gemma:2b';

// 会話履歴
const conversationHistory = [];

// メッセージ送信とLLM応答受信
const sendMessage = async () => {
  const message = messageInput.value.trim();
  if (!message) return;

  messageInput.value = '';
  sendButton.disabled = true;

  // 初期メッセージ「お手伝いできることはありますか？」を削除
  const infoMessage = messagesDiv.querySelector('.info-message');
  if (infoMessage) infoMessage.remove();

  // ユーザーメッセージ表示
  addMessage('user', message);
  // メッセージ履歴に追加
  conversationHistory.push({ role: 'user', content: message });

  try {
    // アシスタント応答領域作成
    const assistantElement = addMessage('assistant', '');
    const contentElement = assistantElement.querySelector('.message-content');
    contentElement.classList.add('streaming');

    // ストリーミングリクエスト送信
    await streamChat(contentElement);

    contentElement.classList.remove('streaming');
  } catch (error) {
    alert(`エラー: ${error.message}`);
  } finally {
    sendButton.disabled = false;
    messageInput.focus();
  }
};

// イベントリスナー登録
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Ollama APIストリーミングリクエスト送信と逐次表示
const streamChat = async (contentElement) => {
  const response = await fetch(`${SERVER_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages: conversationHistory, // メッセージ履歴を渡す
      stream: true,
    }),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let assistantMessage = '';
  let buffer = '';

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const data = JSON.parse(line);

          // 応答内容を逐次表示
          if (data.message?.content) {
            assistantMessage += data.message.content;
            contentElement.textContent = assistantMessage;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
          }

          // 完了時にメッセージ履歴追加
          if (data.done)
            conversationHistory.push({
              role: 'assistant',
              content: assistantMessage,
            });
        } catch (e) {
          console.warn('JSON parse error:', line, e);
        }
      }
    }

    // 残りバッファ処理
    if (buffer.trim()) {
      try {
        const data = JSON.parse(buffer);
        if (data.message?.content) {
          assistantMessage += data.message.content;
          contentElement.textContent = assistantMessage;
        }
      } catch (e) {
        console.warn('Buffer parse error:', buffer, e);
      }
    }
  } finally {
    reader.releaseLock();
  }
};

// メッセージをチャット画面に追加
const addMessage = (role, content) => {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;

  const avatarDiv = document.createElement('div');
  avatarDiv.className = 'message-avatar';
  avatarDiv.textContent = role === 'user' ? 'U' : 'A';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = content;

  messageDiv.appendChild(avatarDiv);
  messageDiv.appendChild(contentDiv);
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  return messageDiv;
};
