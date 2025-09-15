# h1

## 予想

3秒後にAが出力される。
その2秒後にBが出力される。
その1秒後にCが出力される。

```mermaid
gantt
  title h1
  dateFormat  s
  axisFormat |
    wait3  :w3, 0, 3s
    logA  :lA, after w3, 0.2s
    wait2  :w2, after lA, 2s
    logB  :lB, after w2, 0.2s
    wait1  :w1, after lB, 1s
    logc  :lC, after w1, 0.2s
```

## 結果

![alt text](image-1.png)

# h2

## 予想

new PromiseでerrXがthrowされ、それがcatchされてログXが出力される。

```mermaid
gantt
  title h2
  dateFormat  s
  axisFormat |
    logX: lX, 0, 0.1s
```

## 結果

![alt text](image-2.png)

# h3

## 予想

async関数は自動的にPromiseを返す。async内部で例外が発生しても、外側のPromiseではその例外を捕捉できないため、未ハンドリングのエラーXが発生する。

```mermaid
gantt
  title h3
  dateFormat  s
  axisFormat |
    errX: eX, 0, 0.1s
```

## 結果

![alt text](image-3.png)

# h4

## 予想

p1, p2はasync関数ではなく、Promiseを代入しているだけなので、awaitは「Promiseの完了を待つ」だけで「Promiseの開始を遅らせる」ことはできない。
よって、p1とp2はほぼ同時に開始される。
1秒後にwait1が解決し、errYが実行される。
しかし、p1がまだawait中であるため、p2で発生した例外をcatchすることはできない。
従って、errYが未処理例外として表示される。

```mermaid
gantt
  title h4
  dateFormat  s
  axisFormat |
    wait2  :w2, 0, 2s
    wait1  :w1, 0, 1s
    errY: eY, after w1, 0.2s
```

## 結果

![alt text](image-4.png)
