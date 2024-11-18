# webpro_06
## 新しく作成したプログラム
今回の課題においてapp5.jsに以下のプログラムを追加した.
1. ガチャ
1. 数当てゲーム
## それぞれのプログラムの起動方法および操作方法
1. ガチャの起動方法および操作方法
* ターミナル上でapp5.jsが存在するディレクトリに移動し,「npm start」を入力する.
* [URL](localhost:8080/gatya)をweb上で入力する.
* ガチャシステムの画面が起動する.
* その画面上でガチャと書かれたボタンを押すことでガチャをすることができる.
1. 数当てゲームの起動方法および操作方法
* ターミナル上でapp5.jsが存在するディレクトリに移動し,「npm start」を入力する.
* [URL](localhost:8080/find_number)をweb上で入力する.
* 数当てゲームの画面が起動する.
* その画面上で数字を入力する欄があるためそこに任意の数字を記入し,送信ボタンを押す
## それぞれのプログラムの機能
1. ガチャの機能
* このガチャは星５,星４（キャラ）,星４（武器）,星３の４つが排出対象として存在する.それぞれの排出率は予め設定しているが,ガチャの回数が73回を超えると星５の排出率が増加し,90回までには必ず星５が出現するようにした.
* 画面に表示されるものはガチャの結果,ガチャの回数,ステータスコード,今までに獲得したそれぞれの種類の数に設定した.
1. 数当てゲームの機能
* このゲームはランダムに１から１００の中から選びユーザーが入力した数字を元に「正解！」「もっと大きい！」「もっと小さい！」の３つの返答を行い,それを元にユーザーが正解となる数字を導くゲームだ.
* 画面位表示されるものは数字を元にした返答,数字を入力した回数に設定した.
