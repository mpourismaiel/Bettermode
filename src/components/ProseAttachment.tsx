import { DownloadIcon, EyeIcon } from "lucide-react";
import { useCallback } from "react";

import { Button } from "./Button";

import { PostAttachment } from "../types";
import { humanReadableSize } from "../utils/number";

export const ProseAttachment = ({
  attachment,
}: {
  attachment: PostAttachment;
}) => {
  const previewAttachment = useCallback(
    (attachment: PostAttachment) => () => {
      // TODO: Implement preview
      console.log(attachment);
    },
    [],
  );

  const downloadAttachment = useCallback(
    (attachment: PostAttachment) => () => {
      // TODO: Implement download
      console.log(attachment);
    },
    [],
  );

  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-foreground-3 px-6 py-4">
      <div className="flex flex-col justify-start">
        <div className="text-xl text-foreground-1">{attachment.name}</div>
        <div className="text-lg text-foreground-2">
          {humanReadableSize(attachment.size)}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button size="icon" onClick={previewAttachment(attachment)}>
          <EyeIcon className="h-6 w-6" />
        </Button>
        <Button size="icon" onClick={downloadAttachment(attachment)}>
          <DownloadIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};
