/* eslint-disable curly */
import https from 'https';
import { closeIssue, createIssue, listOpenIssues } from './index.js';

describe('Jest のモック関数 を利用して GitHub の API をモックする方法', () => {
  const MOCK_TOKEN = 'test-token';
  const MOCK_OWNER = 'test-owner';
  const MOCK_REPO = 'test-repo';

  let originalRequest;
  beforeEach(() => (originalRequest = https.request));
  afterEach(() => (https.request = originalRequest));

  it('createIssue: Issueを作成できること', async () => {
    const mockResponse = {
      number: 1,
      title: 'Test Issue',
      body: 'Test body',
      html_url: 'https://github.com/test-owner/test-repo/issues/1',
    };

    https.request = (_options, callback) => {
      const mockRes = {
        statusCode: 201,
        statusMessage: 'Created',
        on: (event, handler) => {
          if (event === 'data') handler(JSON.stringify(mockResponse));
          else if (event === 'end') handler();
        },
      };
      callback(mockRes);
      return {
        write: () => {},
        end: () => {},
        on: () => {},
      };
    };

    const result = await createIssue(
      MOCK_TOKEN,
      MOCK_OWNER,
      MOCK_REPO,
      'Test Issue',
      'Test body'
    );

    expect(result.number).toBe(1);
    expect(result.title).toBe('Test Issue');
  });

  it('closeIssue: Issueをクローズできること', async () => {
    // モックレスポンスデータ
    const mockResponse = {
      number: 1,
      title: 'Test Issue',
      state: 'closed',
    };

    // httpsリクエストのモック設定
    https.request = (_options, callback) => {
      const mockRes = {
        statusCode: 200,
        statusMessage: 'OK',
        on: (event, handler) => {
          if (event === 'data') handler(JSON.stringify(mockResponse));
          else if (event === 'end') handler();
        },
      };
      callback(mockRes);
      return {
        write: () => {},
        end: () => {},
        on: () => {},
      };
    };

    const result = await closeIssue(MOCK_TOKEN, MOCK_OWNER, MOCK_REPO, 1);

    expect(result.state).toBe('closed');
  });

  it('listOpenIssues: オープンな Issue 一覧を取得できること', async () => {
    const mockResponse = [
      { number: 1, title: 'Issue 1', state: 'open' },
      { number: 2, title: 'Issue 2', state: 'open' },
    ];

    https.request = (_options, callback) => {
      const mockRes = {
        statusCode: 200,
        statusMessage: 'OK',
        on: (event, handler) => {
          if (event === 'data') handler(JSON.stringify(mockResponse));
          else if (event === 'end') handler();
        },
      };
      callback(mockRes);
      return {
        write: () => {},
        end: () => {},
        on: () => {},
      };
    };

    const result = await listOpenIssues(MOCK_TOKEN, MOCK_OWNER, MOCK_REPO);

    expect(result.length).toBe(2);
    expect(result[0].title).toBe('Issue 1');
    expect(result[1].title).toBe('Issue 2');
  });
});
