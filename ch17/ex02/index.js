/* eslint-disable no-unused-vars */
import https from 'https';

// HTTPSリクエストを実行する関数
export const makeRequest = (githubToken, method, path, data = null) =>
  new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        'User-Agent': 'Node.js GitHub Issue CLI',
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github+json',
      },
    };

    if (data) {
      const jsonData = JSON.stringify(data);
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(jsonData);
    }

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const result = body ? JSON.parse(body) : {};
            resolve(result);
          } catch (_e) {
            resolve(body);
          }
        } else {
          reject(
            new Error(`HTTP ${res.statusCode}: ${res.statusMessage}\n${body}`)
          );
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });

// Issue 作成
export const createIssue = async (
  githubToken,
  owner,
  repo,
  title,
  body = ''
) => {
  const result = await makeRequest(
    githubToken,
    'POST',
    `/repos/${owner}/${repo}/issues`,
    { title, body }
  );
  return result;
};

// Issue クローズ
export const closeIssue = async (githubToken, owner, repo, issueNumber) => {
  const data = { state: 'closed' };
  const result = await makeRequest(
    githubToken,
    'PATCH',
    `/repos/${owner}/${repo}/issues/${issueNumber}`,
    data
  );
  return result;
};

// Issue 一覧取得
export const listOpenIssues = async (githubToken, owner, repo) => {
  const result = await makeRequest(
    githubToken,
    'GET',
    `/repos/${owner}/${repo}/issues?state=open`
  );
  return result;
};
