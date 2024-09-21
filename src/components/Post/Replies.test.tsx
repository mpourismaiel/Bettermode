import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import { GlobalContext } from "../../contexts/global";
import GET_REPLIES from "../../queries/post-replies.gql";
import { PageInfo, Reply } from "../../types";
import { Replies } from "./Replies";

const TEST_REPLY = {
  content: "this is long content",
  shortContent: "this is short content",
};

const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_REPLIES,
    },
    result: {
      data: {
        replies: {
          totalCount: 1,
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          } satisfies PageInfo,
          nodes: [
            {
              id: "1",
              attachments: [],
              slug: "1",
              customSeoDetail: null,
              hasMoreContent: true,
              publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
              shortContent: TEST_REPLY.shortContent,
              mappingFields: [
                {
                  key: "content",
                  type: "text",
                  value: JSON.stringify(TEST_REPLY.content),
                },
              ],
              owner: {
                member: {
                  id: "1",
                  username: "test username",
                  displayName: "test displayname",
                  name: "test name",
                  lastSeenAt: new Date(),
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  profilePicture: {
                    id: "",
                    url: "test",
                    urls: {
                      full: "test",
                      large: "test",
                      medium: "test",
                      small: "test",
                      thumb: "test",
                    },
                  },
                },
              },
            },
          ] satisfies Reply[],
        },
      },
    },
    variableMatcher: () => true,
  },
];

describe("replies component", () => {
  const user = userEvent.setup();
  dayjs.extend(relativeTime);

  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <GlobalContext.Provider
            value={{
              user: null,
              setUser: () => {},
              logout: () => {},
              shouldLoginPopup: false,
            }}
          >
            <Replies postId="123" />
          </GlobalContext.Provider>
        </MemoryRouter>
      </MockedProvider>,
    );
  });

  it("renders without errors", async () => {
    expect(await screen.findByText("test displayname")).toBeInTheDocument();
    expect(screen.getByText("2 days ago")).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Show more" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(TEST_REPLY.shortContent)).toBeInTheDocument();
    expect(screen.queryByText(TEST_REPLY.content)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show more" }));
    expect(
      screen.queryByRole("button", { name: "Show more" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(TEST_REPLY.shortContent)).not.toBeInTheDocument();
    expect(screen.queryByText(TEST_REPLY.content)).toBeInTheDocument();
  });
});
