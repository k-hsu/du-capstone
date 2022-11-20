import React from "react";
import { useRouter } from "next/router";
import { render, screen, userEvent } from "../../../test-utils";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));
describe("Breadcrumbs", () => {
  it("should render breadcrumbs component", () => {
    render(
      <Breadcrumbs
        path={[{ id: "crumb-path", page: "crumb", href: "/to-the-crumb" }]}
        currentPage="bread"
      />
    );
    expect(screen.getByText("bread")).toBeInTheDocument();
    expect(screen.getByText("crumb")).toBeInTheDocument();
  });
  it("should route to url when clicked", () => {
    const mockRouterPush = jest.fn();
    useRouter.mockImplementation(() => ({ push: mockRouterPush }));
    render(
      <Breadcrumbs
        path={[{ id: "crumb-path", page: "crumb", href: "/to-the-crumb" }]}
        currentPage="bread"
      />
    );
    userEvent.click(screen.getByText("crumb"));

    expect(mockRouterPush).toBeCalledWith("/to-the-crumb");
  });
});
