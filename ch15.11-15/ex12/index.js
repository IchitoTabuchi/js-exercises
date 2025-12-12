// アップロードボタンの要素を取得
const uploadButton = document.getElementById('uploadButton');
const fileInput = document.getElementById('file');
const accessTokenInput = document.getElementById('accessToken');

// アップロードボタンのクリックイベント
uploadButton.addEventListener('click', async () => {
  // 入力値の取得
  const accessToken = accessTokenInput.value.trim();
  const file = fileInput.files?.[0];

  if (!accessToken) {
    alert('アクセストークンを入力してください');
    return;
  }
  if (!file) {
    alert('ファイルを選択してください');
    return;
  }

  // 処理中はボタンを disabled にする
  uploadButton.disabled = true;

  try {
    // Graph APIのエンドポイント
    const url = `https://graph.microsoft.com/v1.0/me/drive/root:/${encodeURIComponent(file.name)}:/content`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `HTTP Error: ${response.status}`
      );
    }

    alert('成功！');
  } catch (error) {
    console.error('Upload error:', error);
    alert(`Upload error: ${error.message || 'Unknown Error'}`);
  } finally {
    // ボタンを abled に戻す
    uploadButton.disabled = false;
  }
});
