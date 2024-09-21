import { useQuery } from "@apollo/client/react/hooks";
import { Loader2Icon, MoreHorizontalIcon } from "lucide-react";
import { useCallback, useState } from "react";

import GET_POSTS from "../queries/get-posts.gql";
import { PageInfo, Post } from "../types";
import { capitalize, cn, spaced } from "../utils/string";
import { Post as PostComponent } from "./Post";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/Dropdown";
import { Placeholder } from "./ui/Placeholder";

export const PostsList = () => {
  const [orderByString, setorderByString] = useState<
    "publishedAt" | "reactionsCount" | "lastActivityAt" | "repliesCount"
  >("publishedAt");

  const { loading, error, data, refetch, fetchMore } = useQuery<{
    posts: { nodes: Post[]; pageInfo: PageInfo };
  }>(GET_POSTS, {
    variables: {
      limit: 10,
      reverse: true,
      orderByString,
    },
    notifyOnNetworkStatusChange: true,
  });

  const refetchPosts = useCallback(
    (orderBy: typeof orderByString) => () => {
      setorderByString(orderBy);
      refetch({
        limit: 10,
        reverse: true,
        orderByString,
      });
    },
    [orderByString, refetch],
  );

  const tryFetchMore = useCallback(() => {
    fetchMore({
      variables: {
        after: data?.posts.pageInfo.endCursor,
      },
    });
  }, [data, fetchMore]);

  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div className="mb-4 flex justify-end gap-4">
        <Button
          onClick={refetchPosts("publishedAt")}
          variant={orderByString === "publishedAt" ? "primary" : "secondary"}
        >
          Newest
        </Button>
        <Button
          onClick={refetchPosts("reactionsCount")}
          variant={orderByString === "reactionsCount" ? "primary" : "secondary"}
        >
          Most Popular
        </Button>
        {!["publishedAt", "reactionsCount"].includes(orderByString) ? (
          <Button onClick={refetchPosts("reactionsCount")} variant="primary">
            {spaced(capitalize(orderByString))}
          </Button>
        ) : null}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">
              <MoreHorizontalIcon className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="w-[300px] text-lg text-foreground-2">
              Change Order
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={refetchPosts("lastActivityAt")}
              className="text-lg"
            >
              Last Activity
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={refetchPosts("repliesCount")}
              className="text-lg"
            >
              Replies Count
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-4">
        {loading && !data ? (
          <>
            <Placeholder className="h-[200px] w-full" />
            <Placeholder className="h-[200px] w-full" />
            <Placeholder className="h-[200px] w-full" />
          </>
        ) : !data ? (
          <p>No posts found</p>
        ) : (
          <>
            {data.posts.nodes.map(post => (
              <PostComponent key={post.id} post={post} summaryMode />
            ))}
            {data.posts.pageInfo.hasNextPage ? (
              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={tryFetchMore}
                  disabled={loading}
                  className={cn("w-[200px]", {
                    "animate-pulse": loading,
                  })}
                >
                  {loading ? (
                    <>
                      <Loader2Icon className="h-6 w-6 me-2 animate-spin" />
                      Loading
                    </>
                  ) : (
                    "Load more posts"
                  )}
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};
