console.log('1. nav 要素内のリンク (<a>)', document.querySelectorAll('nav a'));
console.log(
  '2. 商品リスト (.product-list) 内の最初の商品 (.product-item)',
  document.querySelector('.product-list .product-item')
);
console.log(
  '3. カートアイコンの画像 (<img>)',
  document.querySelector('header .cart img')
);
console.log(
  '4. 商品リスト (.product-list) 内の価格 (.price) を表示する要素',
  document.querySelectorAll('.product-list .price')
);
console.log(
  '5. 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)',
  document.querySelectorAll('.product-list .product-item img')
);
console.log(
  '6. 検索バー (.search-bar) 内の検索ボタン (<button>)',
  document.querySelector('.search-bar button')
);
console.log(
  '7. フッター (footer) 内のパラグラフ (<p>) 要素',
  document.querySelector('footer p')
);
console.log(
  '8. 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)',
  document.querySelectorAll('.product-list .product-item:nth-child(even)')
);
console.log(
  '9. ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)',
  document.querySelector('header .account img')
);
console.log(
  '10. ナビゲーションリンクのうち、"会社情報" のリンク',
  document.querySelector('nav a[href="#about"]')
);
