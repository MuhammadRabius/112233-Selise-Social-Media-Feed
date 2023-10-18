import React from "react";
import { BrowserRouter as Route } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader", () => {
  test("renders loader page", () => {
    render(
      <Route>
        <Loader isLoading={true} />
      </Route>
    );
    const element = screen.getByTestId("loader-mock");
    expect(element).toBeInTheDocument();
  });
});
