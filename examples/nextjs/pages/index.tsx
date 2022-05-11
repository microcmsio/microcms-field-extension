import { useMicroCMSIframe } from "microcms-iframe-react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { data, setMessage } = useMicroCMSIframe("", {
    origin: process.env.NEXT_PUBLIC_MICROCMS_ORIGIN || "https://example.microcms.io",
  });

  return (
    <input
      type="color"
      value={String(data)}
      onChange={(e) => {
        setMessage({
          id: "color",
          data: e.target.value,
        });
      }}
    />
  );
};

export default Home;
