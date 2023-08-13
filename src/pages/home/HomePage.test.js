import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
test("renders home page graph and lead table", () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
});
