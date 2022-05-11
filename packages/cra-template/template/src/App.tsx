import { useMicroCMSIframe } from "microcms-iframe-react";
import { ChangeEvent } from "react";

// CHANGEME
const origin = process.env.REACT_APP_MICROCMS_ORIGIN || "https://example.microcms.io";

export default function App() {
  const { data, setMessage } = useMicroCMSIframe("#00ff00", { origin });

  const onChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage({ data: e.target.value });
  };

  return <input type="color" value={data as string} onChange={onChangeColor} />;
}
