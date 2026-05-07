# FUEL LAB — Claude 作業メモ

## このプロジェクトについて
Trail Running Nutrition Planner。シングルHTMLファイルのReactアプリ。

- **本番URL**: https://nooobu.github.io/fuel-lab
- **リポジトリ**: git@github.com:nooobu/fuel-lab.git
- **デプロイ方法**: `master` ブランチに push すると自動で GitHub Pages に反映

## ファイル構成
```
index.html   ← すべてのコードがここに集約（React + Babel CDN）
```

## 開発フロー

### 編集
`index.html` を直接編集する。

### プレビュー確認
```
preview_start("fuel-lab")   # ポート 3456 で起動
```
ローカルストレージの初期化が必要な場合は preview_eval で：
```js
localStorage.setItem('fl_users', JSON.stringify({ テスト: { username: 'テスト', displayName: 'テスト', password: 'test' } }));
localStorage.setItem('fl_currentUser', 'テスト');
localStorage.setItem('fl_テスト_runType', 'trail');
localStorage.setItem('fl_テスト_profile', JSON.stringify({ name: 'テスト', age: 30, height: 170, weight: 65 }));
location.reload();
```

### 変更をデプロイ（本番反映）
```bash
cd "/Users/noobuuu/Library/Mobile Documents/com~apple~CloudDocs/Documents/GitHub/fuel-lab"
git add index.html
git commit -m "feat: ..."
git push origin master
```
→ 1〜2分で https://nooobu.github.io/fuel-lab に反映。

## アーキテクチャ概要
- React 18 (CDN) + Babel Standalone でトランスパイル
- localStorage でデータ永続化 (`fl_` プレフィックス)
- 認証: `fl_currentUser` / `fl_users`

### Admin ログイン
- username: `admin`
- password: `fuellab2026`
- 商品DB管理画面が表示される（`fl_adminProducts` に保存）

### 主要データキー
| キー | 内容 |
|------|------|
| `fl_currentUser` | ログイン中ユーザー名 |
| `fl_users` | ユーザー辞書 |
| `fl_{u}_runType` | ランタイプ (trail/road/both) |
| `fl_{u}_profile` | プロフィール |
| `fl_{u}_plans` | 保存済みプラン一覧 |
| `fl_{u}_customItems` | ユーザー独自食品リスト |
| `fl_adminProducts` | 管理者追加商品DB |

## フォントサイズ方針
最小 **14px**（それ以下は使わない）
