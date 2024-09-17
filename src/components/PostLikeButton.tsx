import { useMutation } from "@apollo/client";
import { Loader2Icon, ThumbsUpIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { Button } from "./Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./Dropdown";

import POST_ADD_REACTION from "../queries/post-add-reaction.gql";

import { emojiMap, emojiVerbsMap } from "../utils/emojies";
import { cn } from "../utils/string";

export const PostLikeButton = ({
  post,
  updateReactions,
}: {
  post: any;
  updateReactions: (reaction: string) => void;
}) => {
  const [reaction, setReaction] = useState<string | null>(null);

  const [addReaction, { loading, error }] = useMutation(POST_ADD_REACTION);

  const authReaction = useMemo(
    () => reaction || post.reactions.find(({ reacted }) => reacted)?.reaction,
    [post, reaction],
  );

  const tryAddReaction = useCallback(
    (reaction: string) => async () => {
      setReaction(reaction);
      await addReaction({
        variables: {
          postId: post.id,
          input: { reaction: reaction, overrideSingleChoiceReactions: true },
        },
      });
      updateReactions(reaction);
    },
    [addReaction, post.id, updateReactions],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          toggle={authReaction ? "active" : "default"}
          size="default"
          className={cn({
            "animate-pulse": loading,
          })}
          disabled={loading}
        >
          {authReaction ? (
            <>
              {loading ? (
                <Loader2Icon className="me-2 h-4 w-4 animate-spin" />
              ) : (
                <span className="me-2">{emojiMap[authReaction]}</span>
              )}
              {emojiVerbsMap[authReaction as keyof typeof emojiMap]}
            </>
          ) : (
            <>
              <ThumbsUpIcon className="me-2 h-4 w-4" />
              Like
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="flex h-[80px] items-center">
        {Object.keys(emojiMap).map(key => (
          <DropdownMenuItem
            key={key}
            className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-xl text-xl transition-all duration-200 ease-out hover:text-3xl"
            onClick={tryAddReaction(key)}
          >
            {emojiMap[key as keyof typeof emojiMap]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
