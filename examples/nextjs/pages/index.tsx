import { useMicroCMSIframe } from "microcms-field-extension-react";
import type { NextPage } from "next";
import { ChangeEvent } from "react";

// CHANGEME
const origin = process.env.NEXT_PUBLIC_MICROCMS_ORIGIN || "https://example.microcms.io";

const Home: NextPage = () => {
  const { data, setMessage } = useMicroCMSIframe("", { origin });

  const onChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage({ data: e.target.value });
  };

  return <input type="color" value={String(data)} onChange={onChangeColor} />;
};

export default Home;
