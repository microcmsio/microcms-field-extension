import { useFieldExtension } from "microcms-field-extension-react";
import { ChangeEvent } from "react";

// CHANGEME
const origin = process.env.REACT_APP_MICROCMS_ORIGIN || "https://example.microcms.io";

export default function App() {
  const { data, sendMessage } = useFieldExtension("#00ff00", { origin });

  const onChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    sendMessage({ data: e.target.value });
  };

  return <input type="color" value={String(data)} onChange={onChangeColor} />;
}
