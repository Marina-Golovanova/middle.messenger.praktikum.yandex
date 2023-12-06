export type IMessageInListProps = {
  id: string;
  activeChatId?: string;
  title: string;
  isUserMessage?: boolean;
  chatUserName?: string;
  message?: string;
  date?: string;
  numberNewMessages?: number;
  avatar?: string;
  onClick?: (id: string) => void;
};

export type IContentType = 'text' | 'image' | 'audio' | 'video';

export type IMessageInChat = {
  isUserMessage: boolean;
  time: string;
  isRead: boolean;
  content: string;
  contentType: IContentType;
};

export type IDialog = {
  chatName: string;
  imageSrc: string;
  messages: IMessageInChat[];
};
