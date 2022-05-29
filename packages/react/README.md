# microcms-field-extension-react

This library is for communicating with the microCMS iframe field via `postMessage`.

`postMessage` protocol is [here](https://document.microcms.io/manual/field-extension).

This library is useful when using React.

## install

```sh
  npm install microcms-field-extension-api microcms-field-extension-react
```

## Usage

```jsx
import { useFieldExtension } from "microcms-field-extension-react";

export default function ColorPicker() {
  const { data, sendMessage } = useFieldExtension("#00ff00", {
    origin: "https://example.microcms.io",
  });

  const onChangeColor = (e) => {
    sendMessage({ id: "color", data: e.target.value });
  };

  return <input type="color" value={data} onChange={onChangeColor} />;
}
```

`useFieldExtension` can take the same arguments as`setup` described in the README of `microcms-field-extension-api`.
