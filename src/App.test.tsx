import { render, screen } from "@testing-library/react";
import { App } from "./App";

test("renders Bike Week text", async () => {
  render(<App />);
  const matched = await screen.findByText(/Bike Week/);
  expect(matched).toBeInTheDocument();
});
