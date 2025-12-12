'use strict';

const button = document.querySelector('#send-button');
const messageContainer = document.getElementById('message-container');
button.addEventListener('click', (e) => {
  e.preventDefault();
  getMessageFromServer();
});

// EventSourceの参照を保持 (後で接続を閉じるため)
let eventSource = null;

async function getMessageFromServer() {
  const messageElement = document.createElement('div');
  messageElement.className = 'message';
  messageElement.textContent = '';
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい

  button.disabled = true;

  // EventSourceを使ってサーバーからメッセージを受信
  eventSource = new EventSource('/message');

  // メッセージ受信時の処理
  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      messageElement.textContent += data.value;

      // done が true の場合は接続を閉じる
      if (data.done) {
        eventSource.close();
        eventSource = null;
        button.disabled = false;
      }
    } catch (error) {
      console.error('Error:', error);
      messageElement.textContent += `\nError: ${error.message}`;
      eventSource.close();
      eventSource = null;
      button.disabled = false;
    }
  };

  // エラー時の処理
  eventSource.onerror = (error) => {
    console.error('Error:', error);
    messageElement.textContent += '\nError: 接続エラー';
    eventSource.close();
    eventSource = null;
    button.disabled = false;
  };
}

// ページを離れる時に接続を閉じる
window.addEventListener('beforeunload', () => {
  if (eventSource) eventSource.close();
});
