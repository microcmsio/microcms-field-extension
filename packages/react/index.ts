import { useCallback, useEffect, useState } from "react";
import * as iframe from "microcms-iframe-api";

type UseMicroCMSIframe = <T>(initialState: T, option: iframe.SetupOption) => UserMicroCMSIframeResult<T>;

type UserMicroCMSIframeResult<T> = {
  data: unknown;
  setMessage: (message: iframe.Message<T>) => void;
  user: iframe.User;
};

export const useMicroCMSIframe: UseMicroCMSIframe = <T>(initialState: T, option: iframe.SetupOption) => {
  const [id, setId] = useState<string>("");
  const [user, setUser] = useState<iframe.User>({ email: "" });
  const [data, setData] = useState<unknown>(initialState);

  useEffect(() => {
    const detach = iframe.setup({
      ...option,
      onDefaultData(data) {
        setId(data.data.id);
        setData(data.data.message.data);
        setUser(data.data.user);
        if (option?.onDefaultData) {
          option.onDefaultData(data);
        }
      },
    });
    return detach;
  });

  const setMessage = useCallback(
    (message: iframe.Message<T>) => {
      setData(message.data);
      iframe.set({ id, message }, option.origin);
    },
    [id]
  );

  return { data, setMessage, user };
};
