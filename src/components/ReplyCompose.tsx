import { SendHorizonalIcon } from "lucide-react";
import { Button } from "./Button";

export const ReplyCompose = ({ postId }: { postId: string }) => {
  return (
    <div className="flex gap-6">
      <img
        src="https://source.unsplash.com/random/100x100"
        alt="User"
        className="mt-2 h-16 w-16 rounded-full"
      />
      <div className="flex flex-1 flex-col gap-2 rounded-md border border-surface-3 p-4">
        <textarea
          className="w-full resize-none rounded-lg border border-none bg-transparent outline-none focus:outline-none active:outline-none"
          placeholder="Write a reply..."
          rows={4}
        />
        <div className="flex justify-end">
          <Button variant="primary" size="icon">
            <SendHorizonalIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
