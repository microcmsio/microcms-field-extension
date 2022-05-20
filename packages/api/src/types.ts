// https://document.microcms.io/manual/field-extension

export type Message<T> = {
  /**
   * 管理画面上で表示されるIDです。
   */
  id?: string;

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

export type User = {
  /**
   * ログイン中のユーザーメールアドレス
   */
  email: string;
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

    user: User;
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

export type SetupOption = {
  origin: string;
  height?: number | string;
  width?: number | string;
  onDefaultData?: (message: GetDefaultDataMessage) => void;
  onPostSuccess?: (message: PostDataResponseSuccessMessage) => void;
  onPostError?: (message: PostDataErrorResponseMessage) => void;
};

export type CleanupFunction = () => void;

export type SetMessage<T> = Omit<PostDataMessage<T>, "action">;
