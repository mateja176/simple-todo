import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Example", () => {
  it("renders heading", () => {
    render(<h1>Hello</h1>);
    expect(screen.getByRole("heading", { name: "Hello" })).toBeInTheDocument();
  });
});
