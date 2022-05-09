# microcms-iframe-api

microCMS の iframe フィールドと `postMessage` で通信するためのライブラリです。

以下のドキュメントで記載されたプロトコルを実装しています。

- [外部データ連携（iFrame フィールド）](https://document.microcms.io/manual/iframe-field)

以下のように使用できます。

```js
import * as iframe from "microcms-iframe-api";

/**
 * iframe フィールドの初期化を行う。
 */
iframe.setup({
  /**
   * この iframe はこのオリジンからのみメッセージを受け取ります。
   * "*" を指定すると全てのオリジンからメッセージを受け取ることができますが、意図しないオリジンからメッセージが注入されるリスクがあるため "*" の指定は推奨しません。
   */
  origin: "https://example.microcms.io",

  /**
   * microCMS 上で表示される iframe フィールドの高さ
   */
  height: 200,

  /**
   * microCMS 上で表示される iframe フィールドの幅
   */
  width: "100%",

  /**
   * iframe フィールドに保存済みの初期値を取得した際のコールバック
   */
  onDefaultData: (message) => console.log(message),

  /**
   * set の呼び出しが成功した際のコールバック
   */
  onPostSuccess: (message) => console.log(message),

  /**
   * set の呼び出しが失敗した際のコールバック
   */
  onPostError: (message) => console.log(message),
});

/**
 * microCMS 本体にデータを送信する。
 */
iframe.set(
  {
    id: "item_123456",

    /**
     * 管理画面で表示するテキスト
     */
    title: "foo",

    /**
     * 管理画面で表示するテキスト
     */
    description: "foo\nbar\n",

    /**
     * 管理画面で表示する画像のURL
     */
    imageUrl: "http://placehold.jp/150x150.png",

    /**
     * 管理画面で表示する更新日時
     */
    updatedAt: "2022-04-26T00:27:13.176Z",

    /**
     * JSON にシリアライズ可能な任意のオブジェクト。
     * この値が API で返されます。
     */
    message: {},
  },

  /**
   * メッセージを送信するオリジン。
   * このオリジン以外には上記のメッセージは送信されません。
   * "*" を指定すると全てのオリジンにこのメッセージを送ることができますが、意図しないオリジンにメッセージが漏洩するリスクがあるため "*" の指定は推奨しません。
   */
  "https://example.microcms.io"
);
```
