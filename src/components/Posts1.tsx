import { useQuery } from "@apollo/client";
import { MoreHorizontalIcon } from "lucide-react";

import { GET_POSTS } from "../queries/get-posts";
import { Post as PostComponent } from "./Post";
import { Placeholder } from "./Placeholder";

export const Posts1 = () => {
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      limit: 10,
      orderByString: "publishedAt",
      reverse: true,
    },
  });

  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="col-span-9">
      <div className="mb-4 flex justify-end gap-4">
        <button
          className="rounded-lg bg-surface-3 px-4 py-2 text-base"
          disabled
        >
          Newest
        </button>
        <button className="rounded-lg bg-surface-1 px-4 py-2 text-base">
          Most Popular
        </button>
        <button className="rounded-lg bg-surface-1 px-4 py-2 text-base">
          <MoreHorizontalIcon className="h-6 w-6" />
        </button>
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
