import { useFieldExtension } from "microcms-field-extension-react";
import type { NextPage } from "next";
import { ChangeEvent } from "react";

// CHANGEME
const origin = process.env.NEXT_PUBLIC_MICROCMS_ORIGIN || "https://example.microcms.io";

const Home: NextPage = () => {
  const { data, sendMessage } = useFieldExtension("", { origin });

  const onChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    sendMessage({ data: e.target.value });
  };

  return <input type="color" value={String(data)} onChange={onChangeColor} />;
};

export default Home;
