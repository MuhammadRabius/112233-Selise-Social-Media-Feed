import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import Report from "./Report";

beforeEach(() => {
  fetchMock.resetMocks();
});

beforeEach(() => {
  fetchMock.mockResponseOnce("", {
    status: 200,
    headers: { "content-type": "application/octet-stream" },
  });
});

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

describe("YourFormComponent", () => {
  test("should trigger download excel on form submission", async () => {
    const onFinishMock = jest.fn();

    render(
      <Router>
        <Report isLoad={"false"} onClick={onFinishMock} />
      </Router>
    );

    const startDay = screen.getByTestId("start-day");
    const endDay = screen.getByTestId("end-day");

    const testStart = userEvent.type(startDay, "2023-09-01");
    const testEnd = userEvent.type(endDay, "2023-09-10");

    const button = screen.getByTestId("submit-mock");
    fireEvent.click(button);
    expect(onFinishMock).toHaveBeenCalled();
  });
});
