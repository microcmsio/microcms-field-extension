import { useMicroCMSIframe } from "microcms-iframe-react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [color, setColor] = useMicroCMSIframe("", {
    origin: process.env.NEXT_PUBLIC_MICROCMS_ORIGIN || "https://example.microcms.io",
  });

  return (
    <input
      type="color"
      value={String(color)}
      onChange={(e) => {
        setColor({
          id: "color",
          data: e.target.value,
        });
      }}
    />
  );
};

export default Home;
