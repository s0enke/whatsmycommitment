import { describe, it, vi } from "vitest";
import { render } from "@testing-library/react";
import axios from "axios";
import App from "../App.tsx";

vi.mock("axios");

describe("App", () => {
  it("should render", () => {
    axios.mockResolvedValue({
      data: { deinemudda: "asdf" },
    });
    render(<App />);
  });
});
