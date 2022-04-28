/* eslint-disable @next/next/no-img-element */

import { useMicroCMSIframe } from "microcms-iframe-react";
import type { GetServerSideProps, NextPage } from "next";

type Object = { url: string };

type Props = {
  objects: Object[];
};

export const getServerSideProps: GetServerSideProps<Props, {}, {}> = async (context) => {
  const objects = await fetch("http://localhost:3000/api/objects").then((res) => res.json());

  return {
    props: {
      objects,
    },
  };
};

const Home: NextPage<Props, {}> = (props: Props) => {
  const [url, setUrl] = useMicroCMSIframe("", {
    height: "600px",
    origin: process.env.NEXT_PUBLIC_MICROCMS_ORIGIN || "https://example.microcms.io",
  });

  console.log({ url });

  return (
    <div style={{ display: "flex" }}>
      {props.objects.map((object) => (
        <div key={object.url} style={object.url === url ? { flex: 1, border: "solid" } : { flex: 1 }}>
          <img
            src={object.url}
            alt={object.url}
            width={200}
            height={200}
            onClick={() =>
              setUrl({
                id: "url",
                data: object.url,
              })
            }
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
