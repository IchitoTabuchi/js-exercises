ES3以前のJavaScriptでは、undefinedはグローバル変数であり、上書き可能であった。<br>
そのため、void 0を上書き不可の未定義値として使用していた。<br>
voidは、直後にどのような値を書いてもundefinedと評価されるので、「void 0」が最も短くundefinedを取得できる書き方であった。

# 参考

https://stackoverflow.com/questions/19369023/should-i-use-void-0-or-undefined-in-javascript
