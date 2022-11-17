import React from "react";
import { useRouter } from "next/router";
import { render, screen, userEvent } from "../../../test-utils";
import Link from "../../../components/Link/Link";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));
describe("Link", () => {
  it("should render link component", () => {
    render(<Link href="/">legend of zelda</Link>);
    expect(screen.getByText("legend of zelda")).toBeInTheDocument();
  });
  it("should route to url when clicked", async () => {
    const mockRouterPush = jest.fn();
    useRouter.mockImplementation(() => ({ push: mockRouterPush }));
    render(<Link href="/link">legend of zelda</Link>);
    await userEvent.click(screen.getByText("legend of zelda"));

    expect(mockRouterPush).toBeCalledWith("/link");
  });
});
