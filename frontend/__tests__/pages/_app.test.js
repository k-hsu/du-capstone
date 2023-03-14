import React from "react";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import getConfig from "next/config";
import { render, screen } from "../../test-utils";
import App from "../../pages/_app";

jest.mock("@emotion/react", () => ({
  css: () => "",
  Global: () => <div>rendering styles</div>,
}));

jest.mock("@apollo/client");
jest.mock("next/config");

describe("App page", () => {
  it("should render App page", () => {
    ApolloClient.mockReturnValue();
    ApolloProvider.mockImplementation(({ children }) => children);
    getConfig.mockReturnValue({ publicRuntimeConfig: { apiUrl: "" } });
    render(<App Component={() => <div>section content</div>} />);

    expect(screen.getByText("section content")).toBeInTheDocument();
    expect(screen.getByText("rendering styles")).toBeInTheDocument();
  });
});
