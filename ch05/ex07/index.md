# 予想

（結果）「false」が出力される

（理由）try内の「return true;」が一旦戻り値の候補になるが、その後にfinally内の「return false;」が実行され、戻り値が上書きされるため。

# 実行結果

「false」が出力された。

![Alt text](image.png)
