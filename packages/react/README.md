# microcms-field-extension-react

This library is for communicating with the microCMS iframe field via `postMessage`.

`postMessage` protocol is [here](https://document.microcms.io/manual/iframe-field).

This library is useful when using React.

## Usage

```jsx
import { useMicroCMSIframe } from "microcms-field-extension-react";

export default function ColorPicker() {
  const [color, setColor] = useMicroCMSIframe("#00ff00", {
    origin: "https://example.microcms.io",
  });

  const onChangeColor = (e) => {
    setColor({ id: "color", data: e.target.value });
  };

  return <input type="color" value={color} onChange={onChangeColor} />;
}
```

`useMicroCMSIframe` can take the same arguments as`setup` described in the README of `microcms-field-extension-api`.
