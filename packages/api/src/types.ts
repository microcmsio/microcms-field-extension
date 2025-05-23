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
  updatedAt?: string | Date;

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

const MessageContextTypeValue = {
  NEW_CONTENT: "new_content",
  EDIT_CONTENT: "edit_content",
} as const;

type MessageContextBase<
  T extends
    (typeof MessageContextTypeValue)[keyof typeof MessageContextTypeValue],
> = {
  type: T;
  endpoint: string;
};
export type MessageContextTypeNewContent = MessageContextBase<
  typeof MessageContextTypeValue.NEW_CONTENT
> & { content: { id: null } };
export type MessageContextTypeEditContent = MessageContextBase<
  typeof MessageContextTypeValue.EDIT_CONTENT
> & { content: { id: string } };
export type MessageContext =
  | MessageContextTypeNewContent
  | MessageContextTypeEditContent;

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

    message?: Partial<Message<any>>;

    user: User;

    context: MessageContext;
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

export type SendMessage<T> = Omit<PostDataMessage<T>, "action">;
