# microcms-field-extension-sdk

[拡張フィールド](https://document.microcms.io/manual/field-extension)で利用するアプリケーションの作成を支援するSDKです。

## 保守方針

このSDKの現在の保守レベルは`Active`です。

詳細は[SDKの保守方針](https://github.com/microcmsio/microcms-js-sdk#%E4%BF%9D%E5%AE%88%E6%96%B9%E9%87%9D)をご覧ください。

## ディレクトリ構成

このリポジトリは、[`Turborepo`](https://turborepo.org/docs/getting-started)を使用したモノレポとして管理されています。

### ライブラリ

- [`microcms-field-extension-api`](./packages/api/): フレームワーク（React、Vue.jsなど）に依存しないライブラリ（[npm](https://www.npmjs.com/package/microcms-field-extension-api)）
- [`microcms-field-extension-react`](./packages/react/): Reactで利用するためのライブラリ（[npm](https://www.npmjs.com/package/microcms-field-extension-react)）

### サンプル

- [`examples/react`](./examples/react/): Reactのサンプル
- [`examples/nextjs`](./examples/nextjs/): Next.jsのサンプル

## 開発

依存パッケージをインストールします。

```sh
npm ci
```

テストとビルドを実行します。

```sh
npm run format && npm run lint && npm run build
```
