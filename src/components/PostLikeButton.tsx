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
import POST_REMOVE_REACTION from "../queries/post-remove-reaction.gql";

import { emojiMap, emojiVerbsMap } from "../utils/emojies";
import { cn } from "../utils/string";

export const PostLikeButton = ({
  post,
  updateReactions,
}: {
  post: any;
  updateReactions: (reaction: string | null) => void;
}) => {
  const [optimisticReaction, setOptimisticReaction] = useState<
    string | "removed" | null
  >(null);

  const [
    addReaction,
    { loading: addReactionLoading, error: addReactionError },
  ] = useMutation(POST_ADD_REACTION);
  const [
    removeReaction,
    { loading: removeReactionLoading, error: removeReactError },
  ] = useMutation(POST_REMOVE_REACTION);

  const loading = useMemo(
    () => addReactionLoading || removeReactionLoading,
    [addReactionLoading, removeReactionLoading],
  );
  const error = useMemo(
    () => addReactionError || removeReactError,
    [addReactionError, removeReactError],
  );

  const authReaction = useMemo(
    () =>
      optimisticReaction ||
      post.reactions.find(({ reacted }) => reacted)?.reaction,
    [post, optimisticReaction],
  );

  const tryAddReaction = useCallback(
    (reaction: string) => async () => {
      if (authReaction === reaction) {
        setOptimisticReaction("removed");
        await removeReaction({
          variables: {
            postId: post.id,
            reaction,
          },
        });
        updateReactions(null);
        return;
      }

      setOptimisticReaction(reaction);
      await addReaction({
        variables: {
          postId: post.id,
          input: { reaction, overrideSingleChoiceReactions: true },
        },
      });
      updateReactions(reaction);
    },
    [addReaction, removeReaction, authReaction, post.id, updateReactions],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={
            authReaction && authReaction !== "removed" ? "primary" : "secondary"
          }
          size="default"
          className={cn({
            "animate-pulse": loading,
          })}
          disabled={loading}
        >
          {authReaction && authReaction !== "removed" ? (
            <>
              {loading ? (
                <Loader2Icon className="me-2 h-4 w-4 animate-spin" />
              ) : (
                <span className="me-2">{emojiMap[authReaction]}</span>
              )}
              <span className="hidden sm:flex">
                {emojiVerbsMap[authReaction as keyof typeof emojiMap]}
              </span>
            </>
          ) : (
            <>
              {loading ? (
                <Loader2Icon className="me-2 h-4 w-4 animate-spin" />
              ) : (
                <ThumbsUpIcon className="me-2 h-4 w-4" />
              )}
              <span className="hidden sm:flex">Like</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="flex h-[80px] items-center">
        {Object.keys(emojiMap).map(key => (
          <DropdownMenuItem
            key={key}
            className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-xl text-xl transition-all duration-200 ease-out hover:text-3xl"
            selected={authReaction === key}
            onClick={tryAddReaction(key)}
          >
            {emojiMap[key as keyof typeof emojiMap]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
