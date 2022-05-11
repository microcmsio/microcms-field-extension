/* eslint-disable @next/next/no-img-element */

import styles from "../styles.module.css";
import { useMicroCMSIframe } from "microcms-iframe-react";
import type { GetServerSideProps, NextPage } from "next";

type File = { url: string };

type Props = {
  objects: File[];
};

const origin =
  process.env.NEXT_PUBLIC_MICROCMS_ORIGIN || "https://example.microcms.io";

export const getServerSideProps: GetServerSideProps<Props, {}, {}> = async (
  context
) => {
  const objects = await fetch("http://localhost:3000/api/files").then((res) =>
    res.json()
  );

  return {
    props: {
      objects,
    },
  };
};

const Home: NextPage<Props, {}> = (props: Props) => {
  const { data: url, setMessage: setUrl } = useMicroCMSIframe("", {
    height: "600px",
    origin,
  });

  return (
    <div>
      {props.objects.map((object) => {
        const active = object.url === url;

        return (
          <img
            key={object.url}
            className={active ? styles.activeImage : styles.image}
            src={object.url}
            alt={object.url}
            onClick={() => setUrl({ data: object.url })}
          />
        );
      })}
    </div>
  );
};

export default Home;
