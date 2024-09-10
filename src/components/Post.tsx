import { useMemo } from "react";
import dayjs from "dayjs";

import { Emoji } from "./Emoji";
import { Prose } from "./Prose";
import { Button } from "./Button";

export const Post = ({
  summaryMode = false,
  post,
}: {
  summaryMode?: boolean;
  post: any;
}) => {
  const content = useMemo(
    () =>
      summaryMode
        ? post.shortContent
        : JSON.parse(
            post.mappingFields.find(({ key }) => key === "content")?.value,
          ) || "",
    [post, summaryMode],
  );

  return (
    <article
      key={post.id}
      className="flex flex-col rounded-lg bg-surface-1 px-6 py-4 shadow-xl"
    >
      <div className="mb-4 flex items-center">
        <img
          src={post.owner.member.profilePicture.urls.thumb}
          alt={post.owner.member.displayName || post.owner.member.name}
          className="me-4 h-12 w-12 rounded-full"
        />
        <div className="flex flex-col">
          <a
            href={`/post/${post.slug}-${post.id}`}
            className="mb-1 text-lg font-bold"
          >
            <h2 className="text-2xl font-bold">{post.title}</h2>
          </a>
          <div className="flex items-center">
            <a href={`/member/${post.owner.member.id}`} className="me-2">
              <h3 className="text-sm text-foreground-2">
                {post.owner.member.displayName || post.owner.member.name}
              </h3>
            </a>
            <span className="me-2 text-foreground-2">•</span>
            <time className="text-sm text-foreground-2">
              {dayjs().to(post.publishedAt)}
            </time>
          </div>
        </div>
      </div>
      <Prose prose={content} attachments={post.attachments} />
      <div className="flex flex-wrap justify-start">
        {post.reactions.map((reaction: any) => (
          <Button variant="primary" size="icon" key={reaction.reaction}>
            <Emoji emoji={reaction.reaction} />
          </Button>
        ))}
      </div>
    </article>
  );
};
