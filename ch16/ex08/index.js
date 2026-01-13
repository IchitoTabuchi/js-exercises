import https from 'https';
import readline from 'readline';

// GitHub API の設定
const GITHUB_API = 'api.github.com';
const OWNER = process.env.GITHUB_OWNER || 'owner';
const REPO = process.env.GITHUB_REPO || 'repo';
const TOKEN = process.env.GITHUB_TOKEN || '';
let verbose = false;

// HTTPSリクエストを実行する関数
const makeRequest = (method, path, data = null) =>
  new Promise((resolve, reject) => {
    const options = {
      hostname: GITHUB_API,
      port: 443,
      path: path,
      method: method,
      headers: {
        'User-Agent': 'Node.js GitHub Issue CLI',
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    };
    if (TOKEN) options.headers['Authorization'] = `Bearer ${TOKEN}`;
    if (data) {
      const jsonData = JSON.stringify(data);
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(jsonData);
    }
    if (verbose) {
      console.error(`[HTTP] ${method} https://${GITHUB_API}${path}`);
      if (data)
        console.error(`[HTTP] Request body: ${JSON.stringify(data, null, 2)}`);
    }

    const req = https.request(options, (res) => {
      let body = '';
      if (verbose) {
        console.error(`[HTTP] Status: ${res.statusCode} ${res.statusMessage}`);
        console.error(
          `[HTTP] Headers: ${JSON.stringify(res.headers, null, 2)}`
        );
      }
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        if (verbose) console.error(`[HTTP] Response body: ${body}`);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const result = body ? JSON.parse(body) : {};
            resolve(result);
          } catch (e) {
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
    if (data) req.write(JSON.stringify(data));
    req.end();
  });

// Issue作成
const createIssue = async (title, body = '') => {
  const result = await makeRequest('POST', `/repos/${OWNER}/${REPO}/issues`, {
    title,
    body,
  });
  console.log(`Issue created: #${result.number} - ${result.title}`);
  console.log(`URL: ${result.html_url}`);
};

// Issueクローズ
const closeIssue = async (issueNumber) => {
  const data = { state: 'closed' };
  const result = await makeRequest(
    'PATCH',
    `/repos/${OWNER}/${REPO}/issues/${issueNumber}`,
    data
  );
  console.log(`Issue closed: #${result.number} - ${result.title}`);
};

// オープンなIssue一覧表示
const listOpenIssues = async () => {
  const result = await makeRequest(
    'GET',
    `/repos/${OWNER}/${REPO}/issues?state=open`
  );
  if (result.length === 0) {
    console.log('No open issues found.');
    return;
  }
  console.log(`Open issues in ${OWNER}/${REPO}:`);
  for (const issue of result) console.log(`#${issue.number}: ${issue.title}`);
};

// ヘルプ表示
const showHelp = () => {
  console.log(`GitHub Issue CLI Tool (Interactive Mode)

Commands:
  create <title> [body]    Create a new issue
  close <issue_number>     Close an issue
  list                     List all open issues
  -v / --verbose           Toggle verbose HTTP logging
  -h / --help              Show this help message
  exit / quit              Exit the program

Environment Variables:
  GITHUB_OWNER            GitHub repository owner (required)
  GITHUB_REPO             GitHub repository name (required)
  GITHUB_TOKEN            GitHub personal access token (required)
`);
};

// コマンドを処理
const processCommand = async (input) => {
  const args = input.trim().split(/\s+/);
  const command = args[0];
  const params = args.slice(1);

  switch (command) {
    case '--help':
    case '-h':
      showHelp();
      break;
    case '--verbose':
    case '-v':
      verbose = !verbose;
      console.log(`Verbose mode: ${verbose ? 'ON' : 'OFF'}`);
      break;
    case 'create':
      if (params.length < 1) {
        console.error('Error: Title is required.');
        break;
      }
      await createIssue(params[0], params.slice(1).join(' ') || '');
      break;
    case 'close':
      if (params.length < 1) {
        console.error('Error: Issue number is required.');
        break;
      }
      await closeIssue(params[0]);
      break;
    case 'list':
      await listOpenIssues();
      break;
    case 'exit':
    case 'quit':
      process.exit(0);
      break;
    default:
      console.error(`Unknown command: ${command}`);
      console.error('Type "help" for available commands.');
  }
};

// 対話型モード
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

console.log('GitHub Issue CLI (Interactive mode)');
console.log('Type "help" for commands, "q" to quit\n');

rl.prompt();

rl.on('line', async (input) => {
  if (input.trim()) {
    try {
      await processCommand(input);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
  rl.prompt();
});
