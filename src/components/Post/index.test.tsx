import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import { Post } from ".";
import POST_ADD_REACTION from "../../queries/post-add-reaction.gql";
import POST_REMOVE_REACTION from "../../queries/post-remove-reaction.gql";
import POST_SUBSCRIBE from "../../queries/post-subscribe.gql";
import POST_UNSUBSCRIBE from "../../queries/post-unsubscribe.gql";
import { Post as PostType } from "../../types";

const TEST_POST = {
  id: "test id",
  slug: "test slug",
  title: "test title",
  shortContent: "test short content",
  content: "test content",
  profile_picture: "test profile picture",
  publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
};

const POST_DATA: PostType = {
  id: TEST_POST.id,
  slug: TEST_POST.slug,
  mappingFields: [
    {
      key: "content",
      value: JSON.stringify(TEST_POST.content),
      type: "text",
    },
  ],
  shortContent: TEST_POST.shortContent,
  publishedAt: new Date(TEST_POST.publishedAt),
  locked: false,
  title: TEST_POST.title,
  description: "test",
  customSeoDetail: null,
  attachments: [],
  authMemberProps: {
    subscribed: false,
    canReact: false,
  },
  owner: {
    member: {
      id: "123",
      username: "test",
      displayName: "test",
      name: "test",
      profilePicture: {
        id: "",
        url: TEST_POST.profile_picture,
        urls: {
          full: TEST_POST.profile_picture,
          large: TEST_POST.profile_picture,
          medium: TEST_POST.profile_picture,
          small: TEST_POST.profile_picture,
          thumb: TEST_POST.profile_picture,
        },
      },
      lastSeenAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  reactions: [],
};

describe("post component", () => {
  const user = userEvent.setup();
  dayjs.extend(relativeTime);

  describe("full mode", () => {
    beforeEach(() => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <MemoryRouter>
            <Post post={POST_DATA} />
          </MemoryRouter>
        </MockedProvider>,
      );
    });

    it("renders the post - full", () => {
      expect(screen.queryByText(TEST_POST.title)).toBeInTheDocument();
      expect(screen.queryByText("2 days ago")).toBeInTheDocument();
      expect(screen.queryByText(TEST_POST.content)).toBeInTheDocument();
      expect(
        screen.queryByText(TEST_POST.shortContent),
      ).not.toBeInTheDocument();
    });
  });

  describe("summary mode", () => {
    beforeEach(() => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <MemoryRouter>
            <Post post={POST_DATA} summaryMode />
          </MemoryRouter>
        </MockedProvider>,
      );
    });

    it("renders the post - summary", () => {
      expect(screen.queryByText(TEST_POST.title)).toBeInTheDocument();
      expect(screen.queryByText("2 days ago")).toBeInTheDocument();
      expect(screen.queryByText(TEST_POST.content)).not.toBeInTheDocument();
      expect(screen.queryByText(TEST_POST.shortContent)).toBeInTheDocument();
    });
  });

  describe("like button", () => {
    beforeEach(() => {
      render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: POST_REMOVE_REACTION,
              },
              result: {
                data: {
                  removeReaction: {
                    status: "success",
                  },
                },
              },
              variableMatcher: () => true,
            },
            {
              request: {
                query: POST_ADD_REACTION,
              },
              result: {
                data: {
                  addReaction: {
                    status: "success",
                  },
                },
              },
              variableMatcher: () => true,
              maxUsageCount: 2,
            },
          ]}
          addTypename={false}
        >
          <MemoryRouter>
            <Post
              post={{
                ...POST_DATA,
                authMemberProps: {
                  ...POST_DATA.authMemberProps,
                  canReact: true,
                },
              }}
              summaryMode
            />
          </MemoryRouter>
        </MockedProvider>,
      );
    });

    it("updates reaction button and list", async () => {
      const reactionButton = (reaction: string) =>
        screen.getByRole("menuitem", { name: reaction });
      const likeButton = (match: RegExp) =>
        screen.queryByRole("button", { name: match });

      expect(
        screen.queryByTestId("reaction-heart-participants"),
      ).not.toBeInTheDocument();
      expect(likeButton(/Like/i)).toBeInTheDocument();
      expect(likeButton(/loved/i)).not.toBeInTheDocument();

      // open reaction list
      await user.click(likeButton(/Like/i)!);
      expect(reactionButton("❤️")).toBeInTheDocument();

      // react with heart
      await user.click(reactionButton("❤️"));
      expect(
        screen.queryByTestId("reaction-heart-participants"),
      ).toBeInTheDocument();
      expect(likeButton(/like/i)).not.toBeInTheDocument();
      expect(likeButton(/loved/i)).toBeInTheDocument();

      // open reaction list
      await user.click(likeButton(/loved/i)!);
      expect(reactionButton("🎉")).toBeInTheDocument();

      // change reaction to celebrate
      await user.click(reactionButton("🎉"));
      expect(
        screen.queryByTestId("reaction-heart-participants"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("reaction-tada-participants"),
      ).toBeInTheDocument();
      expect(likeButton(/like/i)).not.toBeInTheDocument();
      expect(likeButton(/loved/i)).not.toBeInTheDocument();
      expect(likeButton(/celebrated/i)).toBeInTheDocument();

      // open reaction list
      await user.click(likeButton(/celebrated/i)!);
      expect(reactionButton("🎉")).toBeInTheDocument();

      // remove reaction
      await user.click(reactionButton("🎉"));
      expect(likeButton(/loved/i)).not.toBeInTheDocument();
      expect(likeButton(/celebrated/i)).not.toBeInTheDocument();
      expect(likeButton(/like/i)).toBeInTheDocument();
    });
  });

  describe("follow button", () => {
    beforeEach(() => {
      render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: POST_SUBSCRIBE,
                variables: { publisherId: POST_DATA.id },
              },
              result: {
                data: {
                  subscribe: {
                    status: "success",
                  },
                },
              },
            },
            {
              request: {
                query: POST_UNSUBSCRIBE,
                variables: {
                  publisherId: POST_DATA.id,
                },
              },
              result: {
                data: {
                  unsubscribe: {
                    status: "success",
                  },
                },
              },
            },
          ]}
          addTypename={false}
        >
          <MemoryRouter>
            <Post
              post={{
                ...POST_DATA,
                authMemberProps: {
                  ...POST_DATA.authMemberProps,
                  canReact: true,
                },
              }}
              summaryMode
            />
          </MemoryRouter>
        </MockedProvider>,
      );
    });

    it("should toggle subscription", async () => {
      const followButton = (match: RegExp) =>
        screen.queryByRole("button", { name: match });
      expect(followButton(/follow$/i)).toBeInTheDocument();

      await user.click(followButton(/follow$/i)!);
      expect(followButton(/follow$/i)).not.toBeInTheDocument();
      expect(followButton(/followed$/i)).toBeInTheDocument();

      await user.click(followButton(/followed$/i)!);
      expect(followButton(/follow$/i)).toBeInTheDocument();
      expect(followButton(/followed$/i)).not.toBeInTheDocument();
    });
  });
});
