import { useFieldExtension } from "microcms-field-extension-react";

// CHANGEME
const origin = import.meta.env.VITE_MICROCMS_ORIGIN || "https://example.microcms.io";

export default function App() {
  const { data, sendMessage } = useFieldExtension("#00ff00", { origin });

  const onChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    sendMessage({ data: e.target.value });
  };

  return <input type="color" value={String(data)} onChange={onChangeColor} />;
}
