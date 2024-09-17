import { useQuery } from "@apollo/client";

import { Placeholder } from "./Placeholder";
import { Reply } from "./Reply";
import { ReplyCompose } from "./ReplyCompose";

import GET_REPLIES from "../queries/post-replies.gql";

export const Replies = ({ postId }: { postId: string }) => {
  const { loading, error, data } = useQuery(GET_REPLIES, {
    variables: {
      reverse: true,
      orderBy: "publishedAt",
      limit: 10,
      postId,
    },
  });

  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col gap-12 rounded-xl bg-surface-1 p-6">
      <ReplyCompose postId={postId} />
      {loading ? (
        <Placeholder className="h-[150px] w-full" />
      ) : (
        data.replies.nodes.map((reply: any) => (
          <Reply key={reply.id} reply={reply} />
        ))
      )}
    </div>
  );
};
