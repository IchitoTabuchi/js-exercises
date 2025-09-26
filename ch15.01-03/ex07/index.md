# クリックジャッキングとは

クリックジャッキングは、攻撃者が別サイトの UI を透明な iframe や重ねた要素で覆ってユーザーに意図しない操作をさせる攻撃の総称。
例：ユーザーが「再生」や「OK」を押したつもりが、実は背景の別サイト上の「送金」「承認」ボタンを押してしまう、など。

# YouTube のトップページを iframe に入れるとエラーになる理由

- 同一オリジンポリシー（SOP）による制限

ブラウザは同一オリジンポリシーにより、あるオリジン（例 https://your-site.com）の親ドキュメントから、別オリジン（例 https://www.youtube.com）の iframe.contentWindow の DOM に直接アクセスすることを禁止している。
script.js の `document.getElementById("").contentWindowquerySelectorAll('#video-title')` を実行すると、コンソールに次のようなエラーが表示され、ブラウザがアクセスを遮断するため、titles は取得できない。

`Uncaught DOMException: Blocked a frame with origin "https://your-site.com" from accessing a cross-origin frame.`

- X-Frame-Options (CSP: Content-Security-Policy による制限)

さらに youTube などの多くのサイトは iframe に埋め込まれること自体を拒否するヘッダ設定が行われている。

`X-Frame-Options: DENY` または `X-Frame-Options: SAMEORIGIN`

YouTube のトップページは埋め込みを許可していないため、まず iframe で読み込めない（または、クロスオリジン扱いで DOM へアクセス不可となる）。

# 「同一オリジンポリシーがなく、親ページが iframe 内の他サイトの DOM 変更が可能な仕様」だった場合に発生する重大な問題

- 個人情報の盗難

  ユーザーのログイン済みサービスの DOM を読み取り、個人情報やトークンを不正に取得する。

- セッション乗っ取り / アカウント乗っ取り

  ログイン済みページのフォームやCookieにアクセスして認証情報やセッションIDを盗み、なりすましを行う。

- データの改竄 / フィッシング詐欺

  iframe 内の DOM を書き換えてユーザーに誤った情報を見せる。また、正規サイトの見た目を利用してユーザーを騙しパスワード等を入力させる。

# YouTube データを使いたい場合の安全な代替案

- YouTube Data API を使う

  Google の YouTube Data API を使って、公開されているチャンネルや検索結果、関連動画などを取得できる。
  ただし、ユーザー個人の「おすすめ」や視聴履歴などのパーソナライズされた情報を取るには、ユーザーのOAuth同意が必要である。
