import { render, screen } from "@testing-library/react";
import Home from "./page";

test("The page renders", () => {
  render(<Home />);

  expect(screen.getByRole("heading", { name: "TODO" })).toBeInTheDocument();
});
