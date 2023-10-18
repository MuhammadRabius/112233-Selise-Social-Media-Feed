import { BrowserRouter as Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";

describe("Siderbar Quick Links", () => {
  test("renders Sidebar Component", () => {
    render(
      <Route>
        <Sidebar isLoading={false} />
      </Route>
    );
    const element = screen.getByTestId("sidebar-mock");
    expect(element).toBeInTheDocument();
  });

  test("renders Sidebar content", () => {
    render(
      <Route>
        <Sidebar isLoading={false} />
      </Route>
    );
    const element = screen.getByTest("sidebar-mock");
    expect(element).toBeInTheDocument();
  });
});
