import { BrowserRouter as Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

describe("layout", () => {
  test("renders app Layout", () => {
    render(
      <Route>
        <Layout />
      </Route>
    );
    const element = screen.getByTestId("app-layout-mock");
    expect(element).toBeInTheDocument();
  });
  test("renders Layout", () => {
    render(
      <Route>
        <Layout />
      </Route>
    );
    const element = screen.getByTestId("layout-mock");
    expect(element).toBeInTheDocument();
  });
});
