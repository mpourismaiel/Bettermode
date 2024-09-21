import { emojiMap } from "../utils/emojies";

export type PageInfo = {
  endCursor: string | null;
  hasNextPage: boolean;
};

export type Picture = {
  id: string;
  url: string;
  urls: {
    full: string;
    large: string;
    medium: string;
    small: string;
    thumb: string;
  };
};

export type Network = {
  name: string;
  description: string;
  images: {
    lightLogo: {
      id: string;
      url: string;
    };
    darkLogo: {
      id: string;
      url: string;
    };
  };
};

export type PostReaction = {
  count: number;
  reacted: boolean;
  reaction: keyof typeof emojiMap;
};

export type PostReactionParticipantExpanded = {
  id: string;
  displayName: string;
  name: string;
  username: string;
  profilePicture: Picture;
};

export type PostAttachment = {
  id: string;
  extension: string;
  name: string;
  url: string;
  downloadUrl: string;
  size: number;
};

export type Post = {
  id: string;
  slug: string;
  mappingFields: {
    key: string;
    type: string;
    value: unknown;
  }[];
  shortContent: string;
  publishedAt: Date;
  locked: boolean;
  title: string;
  description: string;
  customSeoDetail: {
    description: string;
    noIndex: boolean;
    thumbnail: Picture;
    title: string;
    canonicalUrl: string;
  } | null;
  attachments: PostAttachment[];
  authMemberProps: {
    subscribed: boolean;
    canReact: boolean;
  };
  owner: {
    member: Owner;
  };
  reactions: PostReaction[];
};

export type Reply = {
  id: string;
  slug: string;
  publishedAt: Date;
  mappingFields: {
    key: string;
    type: string;
    value: unknown;
  }[];
  hasMoreContent: boolean;
  shortContent: string;
  thumbnail?: Picture;
  customSeoDetail: {
    description: string;
    noIndex: boolean;
    thumbnail: Picture;
    thumbnailId: string;
    title: string;
    canonicalUrl: string;
  } | null;
  attachments: PostAttachment[];
  owner: {
    member: Owner;
  };
};

export type User = {
  id: string;
  name: string;
  displayName: string;
  username: string;
  email: string;
  profilePicture: Picture;
};

export type Owner = {
  displayName: string;
  name: string;
  id: string;
  username: string;
  lastSeenAt: Date;
  createdAt: Date;
  updatedAt: Date;
  profilePicture: Picture | null;
};
