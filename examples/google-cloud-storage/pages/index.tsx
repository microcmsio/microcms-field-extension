/* eslint-disable @next/next/no-img-element */

import styles from "../styles.module.css";
import { useFieldExtension } from "microcms-field-extension-react";
import type { GetServerSideProps, NextPage } from "next";

// CHANGEME
const origin = process.env.NEXT_PUBLIC_MICROCMS_ORIGIN || "https://example.microcms.io";

type Props = {
  files: { url: string }[];
};

export const getServerSideProps: GetServerSideProps<Props, {}, {}> = async (context) => {
  const files = await fetch("http://localhost:3000/api/files").then((res) => res.json());

  return {
    props: { files },
  };
};

const Home: NextPage<Props, {}> = (props: Props) => {
  const { data: url, sendMessage: setUrl } = useFieldExtension("", {
    height: "600px",
    origin,
  });

  return (
    <div>
      {props.files.map((file) => {
        const active = file.url === url;

        return (
          <img
            key={file.url}
            className={active ? styles.activeImage : styles.image}
            src={file.url}
            alt={file.url}
            onClick={() => setUrl({ data: file.url })}
          />
        );
      })}
    </div>
  );
};

export default Home;
