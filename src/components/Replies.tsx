import { useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";

import GET_REPLIES from "../queries/post-replies.gql";
import { Placeholder } from "./Placeholder";

const Reply = ({ reply }: { reply: any }) => {
  const [showMore, setShowMore] = useState(false);

  const showFullReply = useCallback(() => {
    setShowMore(true);
  }, []);

  return (
    <div className="flex gap-6">
      <img
        src={reply.owner.member.profilePicture.urls.thumb}
        alt={reply.owner.member.displayName || reply.owner.member.name}
        className="mt-2 h-16 w-16 rounded-full"
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-foreground-2">
            {reply.owner.member.displayName || reply.owner.member.name}
          </h4>
          <time className="text-sm text-foreground-3">
            {dayjs().to(reply.publishedAt)}
          </time>
        </div>
        {reply.hasMoreContent && !showMore ? (
          <div className="flex flex-col gap-2">
            <div className="relative flex flex-col">
              <div
                className="prose max-w-full text-foreground-1"
                dangerouslySetInnerHTML={{
                  __html: reply.shortContent,
                }}
              />
              <div className="absolute bottom-0 left-0 h-8 w-full bg-gradient-to-b from-transparent to-surface-1"></div>
            </div>
            <div className="flex justify-start">
              <button
                className="text-blue-500 hover:text-blue-400"
                onClick={showFullReply}
              >
                Show more
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              className="prose max-w-full text-foreground-1"
              dangerouslySetInnerHTML={{
                __html:
                  JSON.parse(
                    reply.mappingFields.find(({ key }) => key === "content")
                      ?.value,
                  ) || "",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

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
