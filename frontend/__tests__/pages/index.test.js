import React from "react";
import { ApolloProvider } from "@apollo/client";
import { createMockClient } from "mock-apollo-client";
import { render, screen } from "../../test-utils";
import Index from "../../pages/index";

jest.mock(
  "next/head",
  () =>
    ({ children }) =>
      children
);

describe("Index page", () => {
  const mockClient = createMockClient();
  it("should render Index page", () => {
    render(
      <ApolloProvider client={mockClient}>
        <Index />
      </ApolloProvider>
    );

    expect(screen.getByText("DU Capstone")).toBeInTheDocument();
  });
});
