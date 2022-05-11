import { useMicroCMSIframe } from "microcms-iframe-react";
import { ChangeEvent } from "react";

// CHANGEME
const origin =
  process.env.REACT_APP_MICROCMS_ORIGIN || "https://example.microcms.io";

export default function App() {
  const [color, setColor] = useMicroCMSIframe("#00ff00", { origin });

  const onChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    setColor({ id: "color", data: e.target.value });
  };

  return (
    <input type="color" value={color as string} onChange={onChangeColor} />
  );
}
