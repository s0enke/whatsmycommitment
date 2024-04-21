import { describe, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import App, { Data } from "../App.tsx";
import { expect } from "vitest";

describe("App", () => {
  it("should render", async () => {
    vi.mock("axios");
    const data: Data = {
      products: [
        {
          attributes: {
            instanceType: "m1",
          },
        },
        {
          attributes: {
            instanceType: "m3",
          },
        },
      ],
    };
    axios.mockResolvedValue({
      data: data,
    });
    render(<App />);
    await waitFor(() => expect(axios).toHaveBeenCalled());
    // ASSERT
    expect(screen.getByRole("instances").firstChild?.textContent).equals("m1");
    expect(screen.getByRole("instances").children[1].textContent).equals("m3");
  });
});
