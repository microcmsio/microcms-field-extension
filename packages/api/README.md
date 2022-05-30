# microcms-field-extension-api

This library is for communicating with the microCMS iframe field via `postMessage`.

`postMessage` protocol is [here](https://document.microcms.io/manual/field-extension).

This library do not depend framework (eg React, Vue.js ...).

## Install

```sh
npm install microcms-field-extension-api
```

## Usage

```js
import { setupFieldExtension, sendFieldExtensionMessage } from "microcms-field-extension-api";

/**
 * Setup iframe field.
 */
setupFieldExtension({
  /**
   * This iframe will only receive messages from this origin.
   * If you specify "*", you can receive messages from all origins. (Not recommend)
   * required.
   */
  origin: "https://example.microcms.io",

  /**
   * Height of iframe field in admin page.
   * string or number. optional.
   */
  height: 200,

  /**
   * Width of iframe field in admin page.
   * string or number. optional.
   */
  width: "100%",

  /**
   * Callback when you get the initial value.
   */
  onDefaultData: (message) => console.log(message),

  /**
   * Callback when you succeed to post value.
   */
  onPostSuccess: (message) => console.log(message),

  /**
   * Callback when you failed to post value.
   */
  onPostError: (message) => console.log(message),
});

/**
 * Send data to microCMS.
 */
sendFieldExtensionMessage(
  {
    id: "item_123456",

    /**
     * Text to be displayed on the admin page.
     * string. optional.
     */
    title: "foo",

    /**
     * Text to be displayed on the admin page.
     * string. optional.
     */
    description: "foo\nbar\n",

    /**
     * Image URL to be displayed on the admin page.
     * string. optional.
     */
    imageUrl: "http://placehold.jp/150x150.png",

    /**
     * Update time to be displayed on the admin page.
     * string or Date. optional.
     */
    updatedAt: "2022-04-26T00:27:13.176Z",

    /**
     * Any object that can be serialized to JSON.
     * This value returned by contents API.
     * required.
     */
    message: {},
  },

  /**
   * Origin passed to `iframe.set`.
   */
  "https://example.microcms.io"
);
```
