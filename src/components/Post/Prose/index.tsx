import { useEffect, useRef, useState } from "react";

import { Attachment } from "./Attachment";

import { PostAttachment } from "../../../types";

export const Prose = ({
  prose,
  attachments,
}: {
  prose: string;
  attachments: PostAttachment[];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [usedAttachments, setUsedAttachments] = useState<PostAttachment[]>([]);

  useEffect(() => {
    if (ref.current) {
      const images = ref.current.querySelectorAll("img");
      images.forEach(image => {
        image.classList.add("rounded-xl");
      });

      if (!attachments) return;

      const attachmentNodes = ref.current.querySelectorAll("attachment");
      setUsedAttachments(
        Array.from(attachmentNodes)
          .map(node => {
            const id = node.getAttribute("data-id");
            return attachments.find(
              ({ id: attachmentId }) => attachmentId === id,
            );
          })
          .filter<PostAttachment>(attachment => !!attachment),
      );
    }
  }, [prose, attachments]);

  return (
    <div className="flex flex-col">
      <div
        ref={ref}
        className="prose mb-4 max-w-full text-foreground-1 lg:prose-lg"
        dangerouslySetInnerHTML={{ __html: prose }}
      />
      {usedAttachments.length > 0 ? (
        <div className="mb-8 flex flex-col gap-2">
          {usedAttachments.map(attachment => (
            <Attachment key={attachment.id} attachment={attachment} />
          ))}
        </div>
      ) : null}
    </div>
  );
};
