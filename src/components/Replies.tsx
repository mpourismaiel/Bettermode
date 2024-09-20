import { useQuery } from "@apollo/client/react/hooks";
import { Loader2Icon } from "lucide-react";
import { useCallback } from "react";

import { Button } from "./Button";
import { Placeholder } from "./Placeholder";
import { Reply } from "./Reply";
import { ReplyCompose } from "./ReplyCompose";

import GET_REPLIES from "../queries/post-replies.gql";

import { cn } from "../utils/string";

export const Replies = ({ postId }: { postId: string }) => {
  const { data, loading, error, fetchMore } = useQuery(GET_REPLIES, {
    variables: {
      reverse: true,
      orderBy: "publishedAt",
      limit: 10,
      postId,
    },
    notifyOnNetworkStatusChange: true,
  });

  const tryFetchMore = useCallback(() => {
    fetchMore({
      variables: {
        after: data.replies.pageInfo.endCursor,
      },
    });
  }, [data, fetchMore]);

  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col gap-12 rounded-xl bg-surface-1 p-6">
      <ReplyCompose postId={postId} />
      {loading && !data ? (
        <Placeholder className="h-[150px] w-full" />
      ) : (
        <>
          {data.replies.nodes.map((reply: any) => (
            <Reply key={reply.id} reply={reply} />
          ))}
          {data.replies.pageInfo.hasNextPage ? (
            <div className="flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={tryFetchMore}
                disabled={loading}
                className={cn({
                  "animate-pulse": loading,
                })}
              >
                {loading ? (
                  <>
                    <Loader2Icon className="h-6 w-6 me-2 animate-spin" />
                    Loading
                  </>
                ) : (
                  "Load more"
                )}
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};
