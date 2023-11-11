import { SimpleElement } from '@components/simple-element';
import { IContentType } from '@pages/chat/types';

export const getMessageContent = (
  contentType: IContentType,
  content: string,
) => {
  const tagsByType: Record<IContentType, string> = {
    audio: 'audio',
    image: 'img',
    video: 'video',
    text: 'span',
  };

  if (contentType === 'text') {
    return new SimpleElement({ tagName: 'span', props: { text: content } });
  }

  return new SimpleElement<Partial<HTMLMediaElement>>({
    tagName: tagsByType[contentType],
    attributes: { src: content },
  });
};
