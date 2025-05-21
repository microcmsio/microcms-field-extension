import { useCallback, useEffect, useState } from "react";
import {
  setupFieldExtension,
  sendFieldExtensionMessage,
  SetupOption,
  GetDefaultDataMessage,
  Message,
  User,
  MessageContext,
} from "microcms-field-extension-api";

type UseFieldExtension = <T>(initialState: T, option: SetupOption) => UseFieldExtensionReturnValue<T>;

type UseFieldExtensionReturnValue<T> = {
  data: T;
  sendMessage: (message: Message<T>) => void;
  user: User;
  context: MessageContext | undefined;
};

export const useFieldExtension: UseFieldExtension = <T>(initialState: T, option: SetupOption) => {
  const [id, setId] = useState<string>("");
  const [user, setUser] = useState<User>({ email: "" });
  const [context, setContext] = useState<MessageContext | undefined>();
  const [data, setData] = useState<T>(initialState);

  useEffect(() => {
    const detach = setupFieldExtension({
      ...option,
      onDefaultData(data: GetDefaultDataMessage) {
        setId(data.data.id);
        if (data.data.message) {
          setData(data.data.message.data);
        }
        setUser(data.data.user);
        setContext(data.data.context);
        if (option?.onDefaultData) {
          option.onDefaultData(data);
        }
      },
    });
    return detach;
  });

  const sendMessage = useCallback(
    (message: Message<T>) => {
      setData(message.data);
      sendFieldExtensionMessage({ id, message }, option.origin);
    },
    [id]
  );

  return { data, sendMessage, user, context };
};
