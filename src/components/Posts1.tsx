import { useQuery } from "@apollo/client";
import { MoreHorizontalIcon } from "lucide-react";

import { GET_POSTS } from "../queries/get-posts";
import { Post as PostComponent } from "./Post";
import { Placeholder } from "./Placeholder";
import { Button } from "./Button";
import { useCallback, useState } from "react";

export const Posts1 = () => {
  const [orderByString, setorderByString] = useState<
    "publishedAt" | "reactionsCount"
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
    <div className="col-span-9">
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
        <Button toggle="inactive">
          <MoreHorizontalIcon className="h-6 w-6" />
        </Button>
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
    </div>
  );
};
