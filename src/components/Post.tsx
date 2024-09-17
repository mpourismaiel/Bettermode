import dayjs from "dayjs";
import { LockIcon, ShareIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "./Button";
import { Emoji } from "./Emoji";
import { PostFollowButton } from "./PostFollowButton";
import { PostLikeButton } from "./PostLikeButton";
import { Prose } from "./Prose";

export const Post = ({
  summaryMode = false,
  post,
}: {
  summaryMode?: boolean;
  post: any;
}) => {
  const [reactions, setReactions] = useState(post.reactions);

  const content = useMemo(
    () =>
      summaryMode
        ? post.shortContent
        : JSON.parse(
            post.mappingFields.find(({ key }) => key === "content")?.value,
          ) || "",
    [post, summaryMode],
  );

  const updateReactions = useCallback(
    (newReaction: string) => {
      // Just a bit complicated so described here:
      // If the new reaction is already listed, add to its count. Otherwise, add a new reaction.
      // If authenticated user has already reacted, reduce the count of that reaction and remove it if the count is 0.
      const reactionsToSet = reactions
        .map(reaction => {
          if (reaction.reacted) {
            return {
              ...reaction,
              reacted: false,
              count: reaction.count - 1,
            };
          } else if (reaction.reaction === newReaction) {
            return {
              ...reaction,
              reacted: true,
              count: reaction.count + 1,
            };
          }

          return reaction;
        })
        .filter(({ count }) => count > 0);

      if (!reactions.some(({ reaction }) => reaction === newReaction)) {
        reactionsToSet.push({
          reaction: newReaction,
          reacted: true,
          count: 1,
        });
      }

      setReactions(reactionsToSet);
    },
    [reactions],
  );

  return (
    <article
      key={post.id}
      className="flex flex-col rounded-lg bg-surface-1 p-6 shadow-xl"
    >
      <div className="mb-4 flex items-center">
        <img
          src={post.owner.member.profilePicture.urls.thumb}
          alt={post.owner.member.displayName || post.owner.member.name}
          className="me-4 h-12 w-12 rounded-full"
        />
        <div className="flex flex-col">
          <Link
            to={`/post/${post.slug}-${post.id}`}
            className="mb-1 text-lg font-bold"
          >
            <h2 className="text-2xl font-bold flex items-center">
              <LockIcon className="me-2 h-4 w-4" />
              {post.title}
            </h2>
          </Link>
          <div className="flex items-center">
            <Link to={`/member/${post.owner.member.id}`} className="me-2">
              <h3 className="text-sm text-foreground-2">
                {post.owner.member.displayName || post.owner.member.name}
              </h3>
            </Link>
            <span className="me-2 text-foreground-2">•</span>
            <time className="text-sm text-foreground-2">
              {dayjs().to(post.publishedAt)}
            </time>
          </div>
        </div>
      </div>
      <Prose prose={content} attachments={post.attachments} />
      <div className="flex flex-wrap justify-start">
        {reactions.map((reaction: any) => (
          <Button variant="secondary" size="icon" key={reaction.reaction}>
            <Emoji emoji={reaction.reaction} />
          </Button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <PostLikeButton post={post} updateReactions={updateReactions} />
        <PostFollowButton post={post} />
        <Button variant="secondary" size="default">
          <ShareIcon className="me-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </article>
  );
};
