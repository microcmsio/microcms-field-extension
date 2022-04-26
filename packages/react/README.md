# microcms-iframe-react

microCMS の iframe フィールドを React から簡単に扱うためのライブラリです。

以下のように使用できます。

```jsx
import { useMicroCMSIframe } from "microcms-iframe-react";

export default function ColorPicker() {
  const [color, setColor] = useMicroCMSIframe({ origin: "https://example.microcms.io" });
  
  const onChangeColor = (e) => {
    setColor({ id: "color", data: e.target.value });
  };

  return <input type="color" value={color || ""} onChange={onChangeColor} />;
}
```

`useMicroCMSIframe` は `microcms-iframe-api` の README で説明されている `setup` と同等の引数を受け取ることができます。
