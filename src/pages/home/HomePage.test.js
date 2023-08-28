import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

describe("HomePage", () => {
  

    it("renders home page graph and lead table", () => {
      // Render the HomePage component
      render(<Router><HomePage /></Router>);
      const barChartElement = screen.getByTestId("bar-chart");
      const tableElement = screen.getByTestId("table");
      expect(barChartElement).toBeInTheDocument();
      expect(tableElement).toBeInTheDocument();
    });

    it("renders DatePicker component", () => {
      // Render the HomePage component
      render(<Router><HomePage /></Router>);

      // Assert that the DatePicker component is rendered
      const datePickerElement = screen.getByTestId("date-picker");
      expect(datePickerElement).toBeInTheDocument();
    });
  });

