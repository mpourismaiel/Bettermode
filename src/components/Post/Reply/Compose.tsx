import { SendHorizonalIcon } from "lucide-react";
import { useCallback, useContext, useState } from "react";
import { toast } from "sonner";

import { GlobalContext } from "../../../contexts/global";
import { Button } from "../../ui/Button";

export const Compose = ({ postId }: { postId: string }) => {
  const { user } = useContext(GlobalContext);

  const [comment, setComment] = useState("");

  const trySubmitReply = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      toast("Out of project scope");
      console.log({ message: "Sending reply", comment, postId });
    },
    [comment, postId],
  );

  if (!user || user.username === "Guest") {
    return null;
  }

  return (
    <form className="flex gap-6" onSubmit={trySubmitReply}>
      <img
        src={
          !user || user.username === "Guest"
            ? "/assets/vite.svg"
            : user.profilePicture.url
        }
        alt="User"
        className="mt-2 h-16 w-16 rounded-full"
      />
      <div className="flex flex-1 flex-col gap-2 rounded-md border border-surface-3 p-4">
        <textarea
          className="w-full resize-none rounded-lg border border-none bg-transparent outline-none focus:outline-none active:outline-none"
          placeholder="Write a reply..."
          rows={4}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <div className="flex justify-end">
          <Button variant="primary" size="icon" type="submit">
            <SendHorizonalIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
};
