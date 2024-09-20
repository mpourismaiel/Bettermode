import { CopyIcon, ShareIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { Post } from "../../types";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Input } from "../ui/Input";

export const ShareButton = ({ post }: { post: Post }) => {
  const [open, setOpen] = useState(false);

  const postURL = useMemo(
    () => `${import.meta.env.VITE_BASE_URL}/post/${post.slug}-${post.id}`,
    [post],
  );

  const copyURL = useCallback(() => {
    navigator.clipboard.writeText(postURL);
    setOpen(false);
  }, [postURL]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="default">
          <ShareIcon className="me-2 h-4 w-4" />
          <span className="hidden sm:flex">Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="text-foreground-1 mt-4">
        <DialogTitle>Share Post</DialogTitle>
        <DialogDescription>
          <p>Share this post with your friends and followers.</p>
        </DialogDescription>
        <div className="flex">
          <Input
            value={postURL}
            className="h-12 rounded-r-none border-r-0"
            readOnly
          />
          <Button
            variant="primary"
            size="icon"
            className="rounded-l-none"
            onClick={copyURL}
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
