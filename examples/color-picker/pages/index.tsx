import { useMicroCMSIframe } from "microcms-iframe-react";

export default function ColorPicker() {
  const [color, setColor] = useMicroCMSIframe<string>({
    origin: process.env.NEXT_PUBLIC_MICROCMS_ORIGIN || "https://example.microcms.io",
  });

  return (
    <input
      type="color"
      value={(color as string) || ""}
      onChange={(e) => {
        setColor({
          id: "color",
          data: e.target.value,
        });
      }}
    />
  );
}
