import { useCallback, useEffect, useState } from "react";
import { setupFieldExtension, sendFieldExtensionData, SetupOption, Message, User } from "microcms-field-extension-api";

type UseMicroCMSIframe = <T>(initialState: T, option: SetupOption) => UserMicroCMSIframeResult<T>;

type UserMicroCMSIframeResult<T> = {
  data: unknown;
  setMessage: (message: Message<T>) => void;
  user: User;
};

export const useFieldExtension: UseMicroCMSIframe = <T>(initialState: T, option: SetupOption) => {
  const [id, setId] = useState<string>("");
  const [user, setUser] = useState<User>({ email: "" });
  const [data, setData] = useState<unknown>(initialState);

  useEffect(() => {
    const detach = setupFieldExtension({
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
    (message: Message<T>) => {
      setData(message.data);
      sendFieldExtensionData({ id, message }, option.origin);
    },
    [id]
  );

  return { data, setMessage, user };
};
