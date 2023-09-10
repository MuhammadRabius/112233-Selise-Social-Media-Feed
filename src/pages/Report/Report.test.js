import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Report from "./Report";

// const mockUsedNavigate = jest.fn();
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => mockUsedNavigate,
// }));

// const data = [{
//   "startDate":
// }]

describe("Check Content", () => {
  it("Check Report", () => {
    render(
      <Router>
        <Report isLoad={"false"} />
      </Router>
    );

    const label = screen.getByTestId("report_mock");
    expect(label.textContent).toBe("Report");
  });

  it("render Form all Components", () => {
    render(
      <Router>
        <Report isLoad={"false"} />
      </Router>
    );
    const startDay = screen.getByTestId("start-day");
    const endDay = screen.getByTestId("end-day");
    const select = screen.getByTestId("source_select");
    const email = screen.getByTestId("report-email");
    const mobile = screen.getByTestId("report-mobileNo");

    expect(startDay).toBeInTheDocument();
    expect(endDay).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(mobile).toBeInTheDocument();
  });
});

// describe("render Form all components", () => {

// });
