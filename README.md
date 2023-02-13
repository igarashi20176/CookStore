# CookStore アプリ
This is My second Vue.js creation
  
作品のURL  
https://moviewer-e9b49.web.app/

今回の制作に伴う記事まとめ  
https://qiita.com/Ren_I/items/2a728c04e8af0c2eb924

## ◆作品の概要

自分の作った料理を記録できます．そのため以前に自分はどんな料理を作ったのかが振り返ることができます．  
加えてオプションでその料理が含んでいる栄養素をグラフで確認できる機能を追加しています．  

## ◆使用技術
・Vue.js setup記法  
・daisy UI  
・TypeScript  
・Express.js  
・Prisma ORM  
・GCP  
　- Firebase Auth  
　- Firebase storage  
　- App Engine  
　- ESPv2 JWT認証  
　- Cloud SQL  
 
 ## ◆システム構成図
<img width="524" alt="system_architect" src="https://user-images.githubusercontent.com/106209681/205901364-62dc77f8-eee7-4655-a52f-19d82a154e25.png">

#### ・ER図
<img width="598" alt="CookStore_ER" src="https://user-images.githubusercontent.com/106209681/205903382-d3164476-d98a-458a-8f9e-d9477160e01a.png">


## ◆制作動機

普段夕食などで何を作ったらいいのか分からなくなる時があるため，記録し，かつ普段の食生活を振り返り栄養素の観点からレシピを選べるようなものを作りたかった．

いいね機能や投稿機能などの基本的な機能を持ったアプリをMySQL，クラウドプラットフォームを用いたフルスタックで制作を行いたかった．  

TypeScriptを使用し，慣れておきたかった．

## ◆意識したこと

・前回の成果物の反省点からの改善<br /><br />
1. コンポーネントが様々な処理を行っていたため，責務が曖昧になっていた  
コンポーネントから，主にDBからのデータの取得，保存などのビジネスロジック(データの加工，計算等)を排除し，Piniaに外だしを行った．  
加えて，Piniaへのアクセスは，極力上位のコンポーネントから行うため，データフローは明確になっていると考える．

2. 非同期処理の理解に乏しくデータの反映がリアルタイムに行えない  
Promiseを活用し，例えばログインしたのに関わらず，ログイン状態がリアルタイムに反映されていなかった問題などが解決できた．

3. UI/UXなどに気を配ることができなかった  
処理に対して，成功の可否をリアルタイムに表示することで，ユーザの使い勝手が向上した．

4. セキュリティの設定を怠っていた  
今回は，バックエンドとFirebase storageにcorsの設定を行い．一定のセキュリティレベルを保障した．またESPv2でJWT認証を追加したことにより，tokenを保有しないユーザ(正式にログインしていない)がユーザ情報のアクセスやレシピの削除を行えないように設定した．

## ◆制作後の反省点
・技術の学習をメインに行った結果，企画に十分な時間を取れず少し曖昧な機能を持つアプリになってしまった．<br /><br />
・記法が統一されておらず，キャメルケースやスネークケースが混在する可読性が低いコードになってしまった．<br /><br />
・機能が増えてくると似たような変数・関数が増えていくためコード全体の可読性が低下してしまった．関数のモジュール化やデザインパターンを学習したりと改善が必要．<br /><br />
・LinterたJestなどのテストフレームワークの知識やバリデーションが不足しているため学習が必要<br /><br />
・ESPv2周りのエンドポイントの指定方法の認識が曖昧であり，エンドポイントURLが分かりにくいものになってしまった.  
具体的には, HTTPメソッドのURLが同じでもメソッドが異なれば，異なるリクエストだと判別できるはずだが，ESPv2だとそういった同一URLの指定が許可されなかった．
 
## ◆機能一覧
・レシピ閲覧  
　レシピを一覧表示します．"詳しく"ボタンを押下するとレシピの詳細を見ることができます．  
　　 - いいね機能...❤をクリックするとお気に入り登録/解除を行います．また登録/解除をリアクティブに反映出来るようにしています.  
　　 - コメント機能...コメントを投稿できます．<br /><br /> 
・メニュー閲覧<br /><br /> 
・レシピ投稿   
　◦登録項目  
　　 - タイトル  
　　 - 概要  
　　 - レシピのジャンル  
　　 - レシピの材料  
　◦栄養情報記録  
　 - グラフでの栄養摂取状況を記録できます．<br /><br /> 
・マイページ機能  
　 - 削除機能と自分の投稿した料理に対する総コメント数，いいね数を確認できます．

## ◆画面スクリーンショット
・レシピ
![CookStore - Google Chrome 2023_02_03 1_11_08](https://user-images.githubusercontent.com/106209681/216486960-92d11909-cf34-458a-99a6-f61f01ca4638.png)

・カテゴリー
![CookStore - Google Chrome 2023_02_03 1_11_02](https://user-images.githubusercontent.com/106209681/216487192-beb5ed88-40e7-4dbf-bc25-47612301a65d.png)

・メニュー
![CookStore - Google Chrome 2023_02_03 1_12_53](https://user-images.githubusercontent.com/106209681/216487020-62cf14b5-186a-47ce-8e5f-63295fd70fbb.png)

・マイページ
![CookStore - Google Chrome 2023_02_03 1_13_35](https://user-images.githubusercontent.com/106209681/216487103-cdd35863-5d2a-4179-8b5c-c5d156f8f254.png)





