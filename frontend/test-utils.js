import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook } from "@testing-library/react-hooks";

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

export * from "@testing-library/react";
export { renderHook, setup };
