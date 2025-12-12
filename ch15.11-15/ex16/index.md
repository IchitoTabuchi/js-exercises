# 問題 15.11-15.16

オリジン間リソース共有（CORS）について、以下の問いに答えなさい。

---

## 1. クロスオリジンリクエストに制約が無かった場合、どのような問題が発生するか述べなさい

### 解答

---

CSRF（Cross-Site Request Forgery）攻撃のリスクが高まる。

- 悪意のあるサイトから、ユーザーが認証済みの別のサイトに対してリクエストを送信できるので、ユーザーのCookieを使って不正な操作（送金、パスワード変更など）が実行される可能性がある。

- 同様に、社内システムなどのAPIにアクセスして機密情報を外部に送信したり、ユーザーのローカルネットワーク内のデバイス（ルーター、IoT機器など）に対して攻撃できてしまう。

## 2. クロスオリジンリクエストで メソッド(POST/GET)やリクエストの内容によって Preflight リクエストの有無が異なるのは何故か、その理由を述べなさい

### 解答

---

CORSが導入される前から存在する既存のWebサイトやAPIが突然動作しなくなることを防ぐため。

- CORSが導入される前から存在する既存のWebサイトやAPIに対する後方互換性を確保するため、従来のHTMLフォーム送信と同等の機能範囲内であれば、Preflightなしで許可するようにした。
- Preflightなしのリクエストは「シンプルリクエスト」と呼ばれ、以下の条件がある。

  以下の条件を全て満たす場合、Preflightリクエストは不要:
  1. **メソッド**: `GET`, `HEAD`, `POST` のいずれか
  2. **ヘッダー**: 以下のヘッダーのみ使用
     - `Accept`
     - `Accept-Language`
     - `Content-Language`
     - `Content-Type` （以下の値のみ）
       - `application/x-www-form-urlencoded`
       - `multipart/form-data`
       - `text/plain`
  3. **その他**: イベントリスナーを追加していないこと、ReadableStream オブジェクトが使用されていないこと、など。

- 逆に上記以外のパターン（メソッドがPUT, DELETE, PATCHなどのリクエスト、認証トークンを含むカスタムヘッダーを使用しているリクエスト、Content-Typeが`application/json`であるリクエスト など）はPreflightが必要になる。
- **重要**: シンプルリクエストの使用は、サーバー開発者がCSRF対策を実施していることを前提としている。

# 参考

- https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/CORS
- https://zenn.dev/tm35/articles/ad05d8605588bd
