import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import { App } from "./App";

describe("renders Bike Week text", () => {
  it("thing", async () => {
    render(<App />);
    const matched = await screen.findByText(/Bike Week/);
    expect(matched).toBeInTheDocument();
  });
});
