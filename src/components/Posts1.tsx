import { useQuery } from "@apollo/client";
import dayjs from "dayjs";

import { GET_POSTS } from "../queries/get-posts";
import { Emoji } from "./Emoji";
import { MoreHorizontalIcon } from "lucide-react";

export const Posts1 = () => {
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      limit: 10,
      orderByString: "publishedAt",
      reverse: true,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="col-span-9">
      <div className="mb-4 flex justify-end gap-4">
        <button
          className="bg-surface-3 rounded-lg px-4 py-2 text-base"
          disabled
        >
          Newest
        </button>
        <button className="bg-surface-1 rounded-lg px-4 py-2 text-base">
          Most Popular
        </button>
        <button className="bg-surface-1 rounded-lg px-4 py-2 text-base">
          <MoreHorizontalIcon className="h-6 w-6" />
        </button>
      </div>
      {data.posts.nodes.map((post: any) => (
        <article
          key={post.id}
          className="bg-surface-1 mb-4 flex flex-col rounded-lg px-6 py-4"
        >
          <div className="mb-4 flex items-center">
            <img
              src={post.owner.member.profilePicture.urls.thumb}
              alt={post.owner.member.displayName || post.owner.member.name}
              className="me-4 h-12 w-12 rounded-full"
            />
            <div className="flex flex-col">
              <a href={`/post/${post.slug}`} className="mb-1 text-lg font-bold">
                <h2 className="text-xl font-bold">{post.title}</h2>
              </a>
              <div className="flex items-center">
                <a href={`/member/${post.owner.member.id}`} className="me-2">
                  <h3 className="text-foreground-2 text-sm">
                    {post.owner.member.displayName || post.owner.member.name}
                  </h3>
                </a>
                <span className="text-foreground-2 me-2">•</span>
                <time className="text-foreground-2 text-sm">
                  {dayjs().to(post.publishedAt)}
                </time>
              </div>
            </div>
          </div>
          <div
            className="text-foreground-1 mb-4 text-base"
            dangerouslySetInnerHTML={{ __html: post.shortContent }}
          />
          <div className="flex flex-wrap justify-start">
            {post.reactions.map((reaction: any) => (
              <button
                className="bg-surface-3 rounded-lg px-2 py-1"
                key={reaction.reaction}
              >
                <Emoji emoji={reaction.reaction} />
              </button>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
};
