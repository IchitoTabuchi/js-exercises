import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { closeIssue, createIssue, listOpenIssues } from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Pollyの設定
Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

dotenv.config({ path: join(__dirname, '.env') });

describe('Polly.JSを用いて、最初の一回だけ GitHub の API と通信し、そのインタラクションを記録して、次回以降は記録されたレスポンスをリプレイする方法', () => {
  let polly;
  const TOKEN = process.env.GITHUB_TOKEN;
  const OWNER = process.env.GITHUB_OWNER;
  const REPO = process.env.GITHUB_REPO;

  beforeEach(() => {
    // Pollyインスタンスを作成
    polly = new Polly('GitHub API Test', {
      adapters: ['node-http'],
      persister: 'fs',
      persisterOptions: {
        fs: {
          recordingsDir: './ex02/__recordings__',
        },
      },
      recordIfMissing: true, // 記録がない場合は実際のAPIにアクセス
      matchRequestsBy: {
        method: true,
        headers: false, // トークンが含まれるためヘッダーは比較しない
        body: true,
        order: false,
        url: {
          protocol: true,
          username: false,
          password: false,
          hostname: true,
          port: true,
          pathname: true,
          query: true,
          hash: false,
        },
      },
    });
  });

  afterEach(async () => await polly.stop());

  it('createIssue: Issueを作成できること', async () => {
    const result = await createIssue(
      TOKEN,
      OWNER,
      REPO,
      'Test Issue from Polly',
      'This is a test'
    );
    expect(result).toHaveProperty('number');
    expect(result).toHaveProperty('title');
  });

  it('createIssue: Issueをクローズできること', async () => {
    const result = await closeIssue(TOKEN, OWNER, REPO, 1);
    expect(result).toHaveProperty('number');
    expect(result).toHaveProperty('title');
  });

  it('listOpenIssues: オープンなIssue一覧を取得できること', async () => {
    const result = await listOpenIssues(TOKEN, OWNER, REPO);
    expect(Array.isArray(result)).toBe(true);
  });
});
