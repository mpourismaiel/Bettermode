import { useQuery } from "@apollo/client";
import { MoreHorizontalIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "./Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./Dropdown";
import { Placeholder } from "./Placeholder";
import { Post as PostComponent } from "./Post";

import GET_POSTS from "../queries/get-posts.gql";

import { capitalize, spaced } from "../utils/string";

export const Posts1 = () => {
  const [orderByString, setorderByString] = useState<
    "publishedAt" | "reactionsCount" | "lastActivityAt" | "repliesCount"
  >("publishedAt");

  const { loading, error, data, refetch } = useQuery(GET_POSTS, {
    variables: {
      limit: 10,
      reverse: true,
      orderByString,
    },
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
    [],
  );

  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div className="mb-4 flex justify-end gap-4">
        <Button
          onClick={refetchPosts("publishedAt")}
          toggle={orderByString === "publishedAt" ? "active" : "inactive"}
        >
          Newest
        </Button>
        <Button
          onClick={refetchPosts("reactionsCount")}
          toggle={orderByString === "reactionsCount" ? "active" : "inactive"}
        >
          Most Popular
        </Button>
        {!["publishedAt", "reactionsCount"].includes(orderByString) ? (
          <Button onClick={refetchPosts("reactionsCount")} toggle="active">
            {spaced(capitalize(orderByString))}
          </Button>
        ) : null}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button toggle="inactive">
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
        {loading ? (
          <>
            <Placeholder className="h-[200px] w-full" />
            <Placeholder className="h-[200px] w-full" />
            <Placeholder className="h-[200px] w-full" />
          </>
        ) : (
          data.posts.nodes.map(post => (
            <PostComponent key={post.id} post={post} summaryMode />
          ))
        )}
      </div>
    </>
  );
};
