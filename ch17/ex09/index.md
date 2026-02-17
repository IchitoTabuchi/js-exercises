# また、`ex09/caller.ts`(TypeScript)、`ex09/caller.js`(Flow)からの呼び出しがそれぞれ動作することを確認しなさい。

## caller.ts (TypeScript)

以下のコマンドで caller.ts を実行する。

```bash
npx tsx ex09/caller.ts
```

結果

```bash
[
  {
    title: 'テキストを読む',
    completed: true,
    user: { id: 1, name: 'Alice' },
    priority: 'high'
  },
  {
    title: '質問表を書く',
    completed: true,
    user: { id: 1, name: 'Alice' },
    priority: 'middle'
  },
  {
    title: '質問表を確認する',
    completed: true,
    user: { id: 2, name: 'Bob' },
    priority: 'low'
  },
  {
    title: '問題を作成する',
    completed: false,
    user: { id: 2, name: 'Bob' },
    priority: 'middle'
  }
]
[
  {
    title: '問題を作成する',
    completed: false,
    user: { id: 2, name: 'Bob' },
    priority: 'middle'
  }
]
```

## caller.js (Flow)

Flow の型チェックを行う。

```bash
npx flow check ex09/
```

結果

```bash
Found 0 errors
```

Flow の caller.js を実行するには、トランスパイルを行い、型情報を除去する必要がある。以下のコマンドで caller.js を実行する。

```bash
npx babel ex09/caller.js ex09/task.flow.js --out-dir ex09/dist
node ex09/dist/caller.js
```

結果

```bash
[
  {
    title: 'テキストを読む',
    completed: true,
    user: { id: 1, name: 'Alice' },
    priority: 'high'
  },
  {
    title: '質問表を書く',
    completed: true,
    user: { id: 1, name: 'Alice' },
    priority: 'middle'
  },
  {
    title: '質問表を確認する',
    completed: true,
    user: { id: 2, name: 'Bob' },
    priority: 'low'
  },
  {
    title: '問題を作成する',
    completed: false,
    user: { id: 2, name: 'Bob' },
    priority: 'middle'
  }
]
[
  {
    title: '問題を作成する',
    completed: false,
    user: { id: 2, name: 'Bob' },
    priority: 'middle'
  }
]
```
