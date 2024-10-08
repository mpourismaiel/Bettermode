import { useLazyQuery } from "@apollo/client/react/hooks";
import { Loader2Icon } from "lucide-react";
import { useCallback } from "react";

import POST_REACTION_PARTICIPANTS from "../../queries/post-reaction-participants.gql";
import {
  PageInfo,
  PostReaction,
  PostReactionParticipantExpanded,
} from "../../types";
import { emojiMap, emojiVerbsMap } from "../../utils/emojies";
import { cn } from "../../utils/string";
import { Emoji } from "../Emoji";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";

export const Reactions = ({
  reactions,
  postId,
}: {
  reactions: PostReaction[];
  postId: string;
}) => {
  const [fetchParticipations, { data, loading, error }] = useLazyQuery<{
    postReactionParticipants: {
      nodes: { participant: PostReactionParticipantExpanded }[];
      pageInfo: PageInfo;
    };
  }>(POST_REACTION_PARTICIPANTS, {
    notifyOnNetworkStatusChange: true,
  });

  const tryOpenReaction = useCallback(
    (reaction: string) => () => {
      fetchParticipations({ variables: { postId, reaction, limit: 10 } });
    },
    [fetchParticipations, postId],
  );

  const fetchMore = useCallback(() => {
    fetchParticipations({
      variables: {
        cursor: data?.postReactionParticipants.pageInfo.endCursor,
      },
    });
  }, [data, fetchParticipations]);

  return (
    <div className="flex flex-wrap justify-start">
      {reactions.map((reaction: PostReaction) => (
        <Dialog key={reaction.reaction}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              onClick={tryOpenReaction(reaction.reaction)}
              data-testid={`reaction-${reaction.reaction}-participants`}
            >
              <Emoji emoji={reaction.reaction} />
            </Button>
          </DialogTrigger>
          <DialogContent className="text-foreground-1">
            <DialogHeader>
              <DialogTitle>
                These people
                <span className="me-1 ms-1">{emojiMap[reaction.reaction]}</span>
                <span className="me-1 font-bold">
                  {emojiVerbsMap[reaction.reaction]}
                </span>
                this post
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="sr-only">
              {`Following people have reacted with ${emojiMap[reaction.reaction]} emoji.`}
            </DialogDescription>
            {loading && !data ? (
              <div className="flex justify-center items-center mt-4">
                <Loader2Icon className="h-8 w-8 animate-spin" />
              </div>
            ) : error ? (
              <Alert>
                <h5 className="font-bold mb-2">
                  Something went wrong while fetching participants.
                </h5>
                <p>{error.message}</p>
              </Alert>
            ) : !data ? (
              <p>No one reacted with this emoji yet.</p>
            ) : (
              <div className="flex flex-col mt-4">
                {data.postReactionParticipants.nodes.length ? (
                  <>
                    {data.postReactionParticipants.nodes.map(
                      ({ participant }) => (
                        <div
                          key={participant.id}
                          className="flex items-center gap-2"
                        >
                          <img
                            src={participant.profilePicture.url}
                            alt={participant.displayName || participant.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <h4 className="ms-2 text-base">
                            {participant.displayName || participant.name}
                          </h4>
                        </div>
                      ),
                    )}
                    {data.postReactionParticipants.pageInfo.hasNextPage && (
                      <div className="flex justify-end mt-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={fetchMore}
                          disabled={loading}
                          className={cn({
                            "animate-pulse": loading,
                          })}
                        >
                          {loading ? (
                            <>
                              <Loader2Icon className="h-6 w-6 me-2" />
                              Loading
                            </>
                          ) : (
                            "Load more"
                          )}
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <Alert>No one reacted with this emoji yet.</Alert>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};
