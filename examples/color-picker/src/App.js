import { useMicroCMSIframe } from "microcms-iframe-react";

function App() {
  const [color, setColor] = useMicroCMSIframe("", { origin: "https://example.microcms.io" });

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
}

export default App;
