import React from "react";
import Document from "../../pages/_document";
import { render } from "../../test-utils";
import { Html, Head, Main, NextScript } from "next/document";

jest.mock("next/document", () => {
  return {
    Html: jest.fn(),
    Head: jest.fn(),
    Main: jest.fn(),
    NextScript: jest.fn(),
  };
});

describe("Document page", () => {
  it("should render Document page", () => {
    const runningSomeScripts = jest.fn();
    Html.mockImplementation(({ children }) => <>{children}</>);
    Head.mockImplementation(({ children }) => <head>{children}</head>);
    Main.mockReturnValue(<div>child components</div>);
    NextScript.mockImplementation(() => {
      runningSomeScripts();
      return <React.Fragment></React.Fragment>;
    });

    const { getByText } = render(<Document />, {
      baseElement: document.documentElement,
      container: document.documentElement,
    });
    expect(document.title).toBe("DU Capstone");
    expect(document.head.querySelector("meta")).not.toBeUndefined();
    expect(document.head.querySelector('link[rel="icon"]')).not.toBeUndefined();
    expect(
      document.head.querySelector('link[rel="stylesheet"]')
    ).not.toBeUndefined();
    expect(getByText("child components")).toBeInTheDocument();
    expect(runningSomeScripts).toBeCalled();
  });
});
