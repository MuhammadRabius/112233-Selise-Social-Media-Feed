import { BrowserRouter as Route } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "./HomePage";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
describe("HomePage", () => {
  test("renders the Ant Design DatePicker component", () => {
    render(<Route><HomePage /></Route>);
    const datePickerElement = screen.getByRole("datepicker");

    expect(datePickerElement).toBeInTheDocument();
  });

  test("triggers onChange event when a date is selected", () => {
    render(<Route><HomePage /></Route>);
    const datePickerElement = screen.getByRole("datepicker");
    const handleChange = jest.fn();

    fireEvent.change(datePickerElement, { target: { value: "2023-08-28" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.anything());
  });

  test('renders "Leads Overview" text', () => {
    render(<Route><HomePage /></Route>);
    const textElement = screen.getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "h1" &&
        /leads overview/i.test(content)
      );
    });

    expect(textElement).toBeInTheDocument();
  });
});
