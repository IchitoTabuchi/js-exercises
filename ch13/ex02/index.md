# f3

## 予想

try/catchでは同期処理しかcatchできないため、Promise内のエラーはcatchされない。
finallyブロックは同期的に実行されるので 初めにlogCが実行される。
次に、0秒後にAが出力される。
その後errXで例外が発生する。

```mermaid
gantt
  title f3
  dateFormat  s
  axisFormat |
    logC  :l3, 0, 0.2s
    wait0 :w0, 0, 0s
    logA  :l1, after w0, 0.2s
    errX :ex, after l1, 0.2s
```

## 結果

![alt text](image.png)

# f4

## 予想

2秒後にAが出力される。
その1秒後にBが出力される。
さらに2回目のthenの戻り値100が渡り、100が出力される。

```mermaid
gantt
  title f4
  dateFormat  s
  axisFormat |
    wait2 :w2, 0, 2s
    logA  :l1, after w2, 0.2s
    wait1 :w1, after l1, 1s
    logB  :l2, after w1, 0.2s
    log100: l3, after l2, 0.2s

```

## 結果

![alt text](image-1.png)

# f5

## 予想

f4と違い、then()に関数ではなくPromiseを渡しているため、wait2とwait1は並行して実行される。
そのため、1秒後にBが出力される。
その1秒後（関数の処理開始から2秒後）に、Aが出力される。
さらにその後、thenに40が渡され、40が出力される。

```mermaid
gantt
  title f5
  dateFormat  s
  axisFormat  |

  section wait1 系
  wait1     :w1, 0, 1s
  logB      :lB, after w1, 0.2s

  section wait2 系
  wait2     :w2, 0, 2s
  logA      :lA, after w2, 0.2s
  log40     :l40, after lA, 0.2s


```

## 結果

![alt text](image-2.png)

# f6

## 予想

1秒後にAが出力される。
pに対する二つのthenは並行して実行されるので、さらに1秒後にBが出力される。
Bが出力された1秒後（Aが出力された2秒後）にCが出力される。

```mermaid
gantt
  title f6
  dateFormat  s
  axisFormat |
    wait1 :w1, 0, 1s
    logA  :l1, after w1, 0.2s
    wait1b: w1b, after l1, 1s
    logB  :l2, after w1b, 0.2s
    wait2 :w2, after l1, 2s
    logC  :l3, after w2, 0.2s

```

## 結果

![alt text](image-3.png)

# f7

## 予想

1秒後にAが出力される。
wait1とwait2は並行して実行されるので、さらに1秒後にwait2が解決する。
このとき、pはすでに解決済みなのですぐにB、続いてCが出力される。

```mermaid
gantt
  title f7
  dateFormat  s
  axisFormat |
    wait1 :w1, 0, 1s
    logA  :l1, after w1, 0.2s
    wait2 :w2, 0, 2s
    logB  :l2, after w2, 0.2s
    logC  :l3, after l2, 0.2s

```

## 結果

![alt text](image-4.png)

# f8

1秒後に、errXで発生した例外がcatchで捕捉され、throwされたエラーのメッセージであるXが出力される。
直後にAが出力される。

## 予想

```mermaid
gantt
  title f8
  dateFormat  s
  axisFormat |
    wait1 :w1, 0, 1s
    logX  :eX, after w1, 0.1s
    logA  :lA, after eX, 0.1s
```

## 結果

![alt text](image-5.png)

# f9

## 予想

1回目のthenは特になにも起こらない。
1秒後にerrYで発生した例外がcatchで捕捉され、throwされたエラーのメッセージであるYが出力される。
直後にAが出力される。

```mermaid
gantt
  title f9
  dateFormat  s
  axisFormat |
    wait1       :w1, 0, 1s
    logY        :lY, after w1, 0.1s
    logA: lA, after lY, 0.1s
```

## 結果

![alt text](image-6.png)

# f10

## 予想

`then(() => 42)`は成功扱いとなり、次のthenのerrYが呼ばれる。
errYはハンドリングされていないため、先にfinallyが処理され、Aが出力される。
その後、エラーYが出力される。

```mermaid
gantt
  title f10
  dateFormat  s
  axisFormat |
    wait1       :w1, 0, 1s
    logA: lA, after w1, 0.1s
    errY  :eY, after lA, 0.1s
```

## 結果

![alt text](image-7.png)

# f11

new PromiseでerrXがthrowされ、それがcatchされてログXが出力される。

```mermaid
gantt
  title f11
  dateFormat  s
  axisFormat |
    logX: lX, 0, 0.1s
```

## 結果

![alt text](image-8.png)

# f12

## 予想

Promise内のsetTimeoutは非同期コールバックなので、
その中で例外をthrowしてもPromiseのcatchでは捕捉できない。
従って、未ハンドリングのエラーXが発生する。

```mermaid
gantt
  title f12
  dateFormat  s
  axisFormat |
    errX: eX 0, 0.1s
```

## 結果

![alt text](image-9.png)
