// https://document.microcms.io/manual/iframe-field

export type Message<T> = {
  id: string;

  /**
   * 管理画面上で表示されるタイトルです。
   */
  title?: string;

  /**
   * 管理画面上で表示される説明文です。
   */
  description?: string;

  /**
   * 管理画面上で表示される画像のURLです。
   */
  imageUrl?: string;

  /**
   * 管理画面上で表示される更新日時です。
   */
  updatedAt?: string;

  /**
   * コンテンツ API のレスポンスとして使われる値です。
   */
  data: T;
};

/**
 * microCMS から iFrame に対して onmessage のイベントで渡されるメッセージです。
 */
export type GetDefaultDataMessage = {
  data: {
    /**
     * iFrame のフィールド ID です。
     * この値には onDefaultData コールバックの引数で渡された data.id が使われます。
     */
    id: string;

    action: "MICROCMS_GET_DEFAULT_DATA";

    message: Partial<Message<unknown>>;
  };
} & MessageEvent<unknown>;

/**
 * iFrame から microCMS に対して postMessage で送るメッセージです。
 */
export type UpdateStyleMessage = {
  /**
   * iFrame のフィールド ID です。
   * この値には onDefaultData コールバックの引数で渡された data.id が使われます。
   */
  id: string;

  action: "MICROCMS_UPDATE_STYLE";

  message: {
    height: number | string;
    width: number | string;
  };
};

/**
 * iFrame から microCMS に対して postMessage で送るメッセージです。
 */
export type PostDataMessage<T> = {
  /**
   * iFrame のフィールド ID です。
   * この値には onDefaultData コールバックの引数で渡された data.id が使われます。
   */
  id: string;

  action: "MICROCMS_POST_DATA";

  message: Message<T>;
};

/**
 * microCMS から iFrame に対して onmessage のイベントで渡されるメッセージです。
 */
export type PostDataResponseSuccessMessage = {
  data: {
    /**
     * iFrame のフィールド ID です。
     * この値には onDefaultData コールバックの引数で渡された data.id が使われます。
     */
    id: string;

    action: "MICROCMS_POST_DATA_SUCCESS";

    message: Message<unknown>;
  };
} & MessageEvent<unknown>;

/**
 * microCMS から iFrame に対して onmessage のイベントで渡されるメッセージです。
 */
export type PostDataErrorResponseMessage = {
  data: {
    /**
     * iFrame のフィールド ID です。
     * この値には onDefaultData コールバックの引数で渡された data.id が使われます。
     */
    id: string;

    action: "MICROCMS_POST_DATA_FAILURE";

    error: string;
  };
} & MessageEvent<unknown>;

export function isGetDefaultDataMessage(e: MessageEvent<any>): e is GetDefaultDataMessage {
  return e.data?.action === "MICROCMS_GET_DEFAULT_DATA";
}

export function isPostDataSuccessMessage(e: MessageEvent<any>): e is PostDataResponseSuccessMessage {
  return e.data?.action === "MICROCMS_POST_DATA_SUCCESS";
}

export function isPostDataErrorMessage(e: MessageEvent<any>): e is PostDataErrorResponseMessage {
  return e.data?.action === "MICROCMS_POST_DATA_FAILURE";
}

export type SetupOption = {
  origin?: string;
  height?: number | string;
  width?: number | string;
  onDefaultData?: (data: GetDefaultDataMessage["data"]) => void;
  onPostSuccess?: (message: PostDataResponseSuccessMessage) => void;
  onPostError?: (message: PostDataErrorResponseMessage) => void;
};

export const defaultSetupOption: Required<SetupOption> = {
  origin: "",
  width: "100%",
  height: 400,
  onDefaultData: (data) => console.log(`microCMS iframe on default data`, data),
  onPostSuccess: (message) => console.log(`microCMS iframe on post success`, message),
  onPostError: (message) => console.error(`microCMS iframe on post error`, message),
};

type CleanupFunction = () => void;

export function setup(option: SetupOption = {}): CleanupFunction {
  const opt = Object.assign({}, defaultSetupOption, option);

  const listener = (e: MessageEvent<unknown>) => {
    if (!e.isTrusted) return;

    if (e.origin !== opt.origin) return;

    if (isGetDefaultDataMessage(e)) {
      const updateStyleMessage: UpdateStyleMessage = {
        id: e.data.id,
        action: "MICROCMS_UPDATE_STYLE",
        message: {
          height: opt.height,
          width: opt.width,
        },
      };
      window.parent.postMessage(updateStyleMessage, origin);

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

type SetMessage<T> = Omit<PostDataMessage<T>, "action">;

export function set<T>(message: SetMessage<T>, origin: string) {
  const msg: PostDataMessage<T> = Object.assign({}, message, { action: "MICROCMS_POST_DATA" as const });

  window.parent.postMessage(msg, origin);
}
