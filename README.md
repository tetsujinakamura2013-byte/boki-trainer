# 簿記3級 5要素トレーニング

勘定科目を「資産・負債・純資産・費用・収益・その他」に分類するだけの、スマホ向けシンプルアプリです。

## 主な仕様

- 勘定科目をランダム表示
- 6つの分類ボタン
- 判定は「○」「×」のみ
- 履歴なし
- 解説なし
- スマホ対応
- iPhoneのホーム画面へ追加可能
- データベース不要

## ローカル確認

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## Cloudflare Workersへ公開

1. Node.jsをインストール
2. このフォルダを開く
3. 次を実行

```bash
npm install
npx wrangler login
npm run deploy
```

完了後、Cloudflareが公開URLを表示します。

## iPhoneのホーム画面へ追加

1. 公開URLをSafariで開く
2. 画面下の共有ボタンを押す
3. 「ホーム画面に追加」を押す
4. 「追加」を押す

## 勘定科目の追加・修正

`app/page.tsx` 内の `accounts` 配列を編集します。

例：

```ts
{ name: "現金", type: "資産" }
```

`type` は次の6種類です。

- 資産
- 負債
- 純資産
- 費用
- 収益
- その他
