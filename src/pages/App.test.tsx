import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import GET_POSTS from "../queries/get-posts.gql";
import { App } from "./App";

const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_POSTS,
      variables: { limit: 10, reverse: true, orderByString: "publishedAt" },
    },
  },
];

describe("render", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>,
    );
  });
  it("renders the main page", () => {
    expect(true).toBeTruthy();
  });
});
