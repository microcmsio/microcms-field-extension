import { useCallback, useEffect, useState } from "react";
import * as iframe from "microcms-iframe-api";

type UseMicroCMSIframe = <T>(
  initialState: T,
  option?: iframe.SetupOption
) => [unknown, (message: iframe.Message<T>) => void];

export const useMicroCMSIframe: UseMicroCMSIframe = <T>(initialState: T, option: iframe.SetupOption = {}) => {
  const [id, setId] = useState<string>("");
  const [data, setData] = useState<unknown>(initialState);

  useEffect(() => {
    const detach = iframe.setup({
      ...option,
      onDefaultData(data) {
        setId(data.id);
        setData(data.message.data);
        if (option?.onDefaultData) {
          option.onDefaultData(data);
        }
      },
    });
    return detach;
  });

  const set = useCallback(
    (message: iframe.Message<T>) => {
      setData(message.data);
      iframe.set({ id, message }, option.origin || "");
    },
    [id]
  );

  return [data, set];
};
