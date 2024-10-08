import { useQuery } from "@apollo/client/react/hooks";
import { Loader2Icon } from "lucide-react";
import { useCallback } from "react";

import GET_REPLIES from "../../queries/post-replies.gql";
import { PageInfo, Reply as ReplyType } from "../../types";
import { cn } from "../../utils/string";
import { Button } from "../ui/Button";
import { Placeholder } from "../ui/Placeholder";
import { Reply } from "./Reply";
import { Compose } from "./Reply/Compose";

export const Replies = ({ postId }: { postId: string }) => {
  const { data, loading, error, fetchMore } = useQuery<{
    replies: {
      nodes: ReplyType[];
      pageInfo: PageInfo;
    };
  }>(GET_REPLIES, {
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
        after: data?.replies.pageInfo.endCursor,
      },
    });
  }, [data, fetchMore]);

  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col gap-12 rounded-xl bg-surface-1 p-6">
      <Compose postId={postId} />
      {loading && !data ? (
        <Placeholder className="h-[150px] w-full" />
      ) : !data ? (
        <p>No replies yet</p>
      ) : (
        <>
          {data.replies.nodes.map(reply => (
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
