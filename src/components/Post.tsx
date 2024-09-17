import { useMemo } from "react";
import { BellIcon, BellRingIcon, ShareIcon, ThumbsUpIcon } from "lucide-react";
import dayjs from "dayjs";

import { Emoji } from "./Emoji";
import { Prose } from "./Prose";
import { Button } from "./Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./Dropdown";
import { emojiMap, emojiVerbsMap } from "../utils/emojies";
import { Link } from "react-router-dom";

export const FollowButton = ({ post }: { post: any }) => {
  return (
    <Button variant="secondary" size="default">
      {post.authMemberProps.subscribed ? (
        <>
          <BellRingIcon className="me-2 h-4 w-4" />
          Followed
        </>
      ) : (
        <>
          <BellIcon className="me-2 h-4 w-4" />
          Follow
        </>
      )}
    </Button>
  );
};

const LikeButton = ({ post }: { post: any }) => {
  const authReaction = useMemo(
    () => post.reactions.some(({ reacted }) => reacted),
    [post],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          toggle={authReaction ? "active" : "default"}
          size="default"
        >
          {authReaction ? (
            <>
              <span className="me-2">{authReaction.reaction}</span>
              {emojiVerbsMap[authReaction.reaction as keyof typeof emojiMap]}
            </>
          ) : (
            <>
              <ThumbsUpIcon className="me-2 h-4 w-4" />
              Like
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex h-[80px] items-center">
        {Object.keys(emojiMap).map(key => (
          <DropdownMenuItem
            key={key}
            className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-xl text-xl transition-all duration-200 ease-out hover:text-3xl"
          >
            {emojiMap[key as keyof typeof emojiMap]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
            <h2 className="text-2xl font-bold">{post.title}</h2>
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
        {post.reactions.map((reaction: any) => (
          <Button variant="secondary" size="icon" key={reaction.reaction}>
            <Emoji emoji={reaction.reaction} />
          </Button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <LikeButton post={post} />
        <FollowButton post={post} />
        <Button variant="secondary" size="default">
          <ShareIcon className="me-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </article>
  );
};
