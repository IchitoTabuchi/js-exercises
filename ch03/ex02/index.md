# 実行結果

![Alt text](image.png)

## MAX_SAFE_INTEGER + 1 === MAX_SAFE_INTEGER + 2 となる理由

MAX_SAFE_INTEGER は丸め誤差が発生せずに計算できる最大の数を表す。よって、この最大値を超えると整数の精度を保証できず、四捨五入や切り捨ての丸めによって +1 も +2 も同じ値として扱われる。
