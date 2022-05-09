import {
  CleanupFunction,
  GetDefaultDataMessage,
  PostDataErrorResponseMessage,
  PostDataMessage,
  PostDataResponseSuccessMessage,
  SetMessage,
  SetupOption,
  UpdateStyleMessage,
} from "./types";

export function isGetDefaultDataMessage(e: MessageEvent<any>): e is GetDefaultDataMessage {
  return e.data?.action === "MICROCMS_GET_DEFAULT_DATA";
}

export function isPostDataSuccessMessage(e: MessageEvent<any>): e is PostDataResponseSuccessMessage {
  return e.data?.action === "MICROCMS_POST_DATA_SUCCESS";
}

export function isPostDataErrorMessage(e: MessageEvent<any>): e is PostDataErrorResponseMessage {
  return e.data?.action === "MICROCMS_POST_DATA_FAILURE";
}

export const defaultSetupOption = {
  width: "100%",
  height: 400,
  onDefaultData: (data: GetDefaultDataMessage["data"]) => console.log(`microCMS iframe on default data`, data),
  onPostSuccess: (message: PostDataResponseSuccessMessage) => console.log(`microCMS iframe on post success`, message),
  onPostError: (message: PostDataErrorResponseMessage) => console.error(`microCMS iframe on post error`, message),
};

export function setup(option: SetupOption): CleanupFunction {
  const opt = Object.assign({}, defaultSetupOption, option);

  const listener = (e: MessageEvent<unknown>) => {
    if (!e.isTrusted) return;

    if (e.origin !== opt.origin && opt.origin !== "*") return;

    if (isGetDefaultDataMessage(e)) {
      const updateStyleMessage: UpdateStyleMessage = {
        id: e.data.id,
        action: "MICROCMS_UPDATE_STYLE",
        message: {
          height: opt.height,
          width: opt.width,
        },
      };
      window.parent.postMessage(updateStyleMessage, opt.origin);

      opt.onDefaultData(e.data);
    }

    if (isPostDataSuccessMessage(e)) {
      opt.onPostSuccess(e);
    }

    if (isPostDataErrorMessage(e)) {
      opt.onPostError(e);
    }
  };

  window.addEventListener("message", listener);

  return () => window.removeEventListener("message", listener);
}

export function set<T>(message: SetMessage<T>, origin: string) {
  const msg: PostDataMessage<T> = Object.assign({}, message, { action: "MICROCMS_POST_DATA" as const });

  window.parent.postMessage(msg, origin);
}
