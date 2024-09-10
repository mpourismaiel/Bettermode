import { useCallback, useEffect, useRef, useState } from "react";

import { humanReadableSize } from "../utils/number";
import { DownloadIcon, EyeIcon } from "lucide-react";

export const Prose = ({
  prose,
  attachments,
}: {
  prose: string;
  attachments: any[];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [usedAttachments, setUsedAttachments] = useState<any[]>([]);

  const previewAttachment = useCallback(
    (attachment: any) => () => {
      // TODO: Implement preview
      console.log(attachment);
    },
    [],
  );

  const downloadAttachment = useCallback(
    (attachment: any) => () => {
      // TODO: Implement download
      console.log(attachment);
    },
    [],
  );

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
          .filter(Boolean),
      );
    }
  }, [prose, attachments]);

  return (
    <div className="flex flex-col">
      <div
        ref={ref}
        className="prose lg:prose-lg mb-4 max-w-full text-foreground-1"
        dangerouslySetInnerHTML={{ __html: prose }}
      />
      <div className="mb-8 flex flex-col gap-2">
        {usedAttachments.map(attachment => (
          <div className="flex items-center justify-between gap-2 rounded-xl border border-foreground-3 px-6 py-4">
            <div className="flex flex-col justify-start">
              <div className="text-xl text-foreground-1">{attachment.name}</div>
              <div className="text-lg text-foreground-2">
                {humanReadableSize(attachment.size)}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-1 transition-all duration-200 ease-out hover:bg-surface-3"
                onClick={previewAttachment(attachment)}
              >
                <EyeIcon className="h-6 w-6" />
              </button>
              <button
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-1 transition-all duration-200 ease-out hover:bg-surface-3"
                onClick={downloadAttachment(attachment)}
              >
                <DownloadIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
