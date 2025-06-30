"use client";

import { useEffect, useState } from "react";
import { useFieldExtension } from "microcms-field-extension-react";
import { InputField } from "./components/InputField";
import styles from "./page.module.css";

type Address = {
  postalCode: string;
  prefecture: string;
  city: string;
  town: string;
};

const origin = process.env.NEXT_PUBLIC_MICROCMS_ORIGIN || "https://xxxx.microcms.io";

const TITLE = "住所";

const formatAddressString = (data: Address) => {
  return `${data.postalCode} ${data.prefecture}${data.city}${data.town}`;
};

export default function AddressFromZipcode() {
  const { data, sendMessage } = useFieldExtension<Address>("" as any, {
    origin: origin,
    height: 370,
  });

  const [postalCode, setPostalCode] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (data) {
      setPostalCode(data.postalCode || "");
      setPrefecture(data.prefecture || "");
      setCity(data.city || "");
      setTown(data.town || "");
    }
  }, [data]);

  const handleSearch = async () => {
    const normalizedPostalCode = postalCode.replace(/-/g, ""); // ハイフン削除

    if (!/^\d{7}$/.test(normalizedPostalCode)) {
      setError("郵便番号は7桁の数字で入力してください。");
      return;
    }

    setError("");

    try {
      const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${normalizedPostalCode}`);
      const json = await res.json();

      if (json.results && json.results.length > 0) {
        const result = json.results[0];

        setPrefecture(result.address1);
        setCity(result.address2);
        setTown(result.address3);

        const data = {
          postalCode: normalizedPostalCode,
          prefecture: result.address1,
          city: result.address2,
          town: result.address3,
        };

        sendMessage({
          title: TITLE,
          description: formatAddressString(data),
          data,
        });
      } else {
        setError("該当する住所が見つかりませんでした。");
      }
    } catch (e) {
      setError("住所検索中にエラーが発生しました。");
    }
  };

  const updateField = (field: keyof Address, value: string) => {
    const newData: Address = {
      postalCode,
      prefecture,
      city,
      town,
      [field]: value,
    };

    switch (field) {
      case "postalCode":
        setPostalCode(value);
        break;
      case "prefecture":
        setPrefecture(value);
        break;
      case "city":
        setCity(value);
        break;
      case "town":
        setTown(value);
        break;
    }

    sendMessage({
      title: TITLE,
      description: formatAddressString(newData),
      data: newData,
    });
  };

  return (
    <div className={styles.container}>
      <form>
        <InputField
          label="郵便番号（7桁）"
          value={postalCode}
          onChange={(value) => updateField("postalCode", value)}
          placeholder="例: 1000001"
          size="small"
          withButton={{ label: "住所を検索", onClick: handleSearch }}
          error={error}
        />

        <InputField
          label="都道府県"
          value={prefecture}
          onChange={(value) => updateField("prefecture", value)}
          size="small"
        />
        <InputField
          label="市区町村"
          value={city}
          onChange={(value) => updateField("city", value)}
          size="medium"
        />
        <InputField
          label="町名以下"
          value={town}
          onChange={(value) => updateField("town", value)}
          size="large"
        />
      </form>
    </div>
  );
}
