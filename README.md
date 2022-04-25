# microcms-iframe-sdk

microCMS では標準で用意されているテキスト、数値、画像などのフィールド以外にも iframe で埋め込んだページからデータを取得することができます。

このリポジトリでは iframe に埋め込まれる側のページを作るためのライブラリやそのサンプルを提供します。

## ディレクトリ構成

このリポジトリは [`turborepo`](https://turborepo.org/docs/getting-started) を用いたモノリポになっています。

- [`microcms-iframe-api`](./packages/api/): 最も基本的なプロトコルを実装したライブラリです。 React からでも Vue.js からでも Vanilla JS からでも使用できます。
- [`microcms-iframe-react`](./packages/react/): React hooks を提供するライブラリです。これを使用して低レベルなプロトコルを意識せずに iframe フィールドを開発できます。
- [`examples/color-picker`](./examples/color-picker/): [`microcms-iframe-react`](./packages/react/) を使用した Nest.js の最もシンプルな例です。
