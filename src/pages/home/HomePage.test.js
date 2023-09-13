import { BrowserRouter as Route } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "./HomePage";
import userEvent from '@testing-library/user-event';
import { DatePicker } from 'antd';
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getLeadSource } from "./Service/homepage_action";
const axios = require('axios');
const app = require('./Service/homepage_action');
const request = require('supertest');
jest.mock('axios');
axios.get.mockResolvedValue({ data: { message: 'Mocked response' }});
describe("HomePage", () => {
  it("render HomePage", () => {
    render(
      <Route>
        <HomePage isLoad={"false"} />
      </Route>
    );
    const container = screen.getByTestId("dashboard-mock");
    expect(container).toHaveClass("homePage-content");
  });
  it("renders HomePage Pages Contents", () => {
    render(
      <Route>
        <HomePage isLoad={"false"} />
      </Route>
    );
    const textGraph = screen.getByTestId("home-graph");
    const textTable = screen.getByTestId("home-table");
    const datePicker = screen.getByTestId("date-picker");
    expect(textGraph).toBeInTheDocument();
    expect(textTable).toBeInTheDocument();
    expect(datePicker).toBeInTheDocument();
  });
});

// DatePicker
describe("RangePicker", () => {
  it("should be possible to set a start and end date", async () => {
    const onChange = jest.fn();
    render(
      <Route>
        <HomePage isLoad={"false"} onChange ={onChange}/>
      </Route>
    );

    const startDateInput = screen.getByPlaceholderText("Start date");
    const endDateInput = screen.getByPlaceholderText("End date");

    const testStart = await userEvent.type(startDateInput, "2023-07-01");

    const testEnd = await userEvent.type(endDateInput, "2023-07-15");

    expect(startDateInput).toHaveValue(testStart);
    expect(endDateInput).toHaveValue(testEnd);
  });

  test("disables certain dates", () => {
    const onChange = jest.fn();
    const disabledDate = (current) => current.isAfter(dayjs());

    render(
      <Route>
        <HomePage
          isLoad={"false"}
          onChange={onChange}
          disabledDate={disabledDate}
        />
      </Route>
    );

    const input = screen.getByPlaceholderText("End date");
    const disabledDateStr = dayjs().add(-2, "days").format("YYYY-MM-DD");
  

    fireEvent.change(input, { target: { value: disabledDateStr } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onChange).not.toHaveBeenCalled();
    
  });
});


// Graph Testing

describe("render HomePage barchart", () => {
  
  it("BarGraph", () => {
    render(
      <Route>
        <HomePage isLoad={"false"} />
      </Route>
    );

    const container = screen.getByTestId("chartContent-mock");
    expect(container).toHaveClass("chart_section");
  });
  
  // it("BarGraph", () => {

  //   const testData = [
  //     {leadSourceTypeName: "Organic", totalLeadSentToUaa: 0},
  //     {leadSourceTypeName: "Paid", totalLeadSentToUaa: 2078},
  //     {leadSourceTypeName: "Agent Led", totalLeadSentToUaa: 0}
  //   ];
    
  //   render(
  //     <Route>
  //       <HomePage isLoad={"false"} data={testData}/>
  //     </Route>
  //   );

  //   // const Organic = screen.getByText('0');
  //   // const Paid = screen.getByText('2078');
  //   // const AgentLed = screen.getByText('0');
  //   const tooltip = screen.getByTestId('tooltip');
  //   // const chart = screen.getByTestId("bar-chart");
  //   // expect(chart.getAttribute('width')).toBe('900');
  //   // expect(chart.getAttribute('height')).toBe('300');
  //   // expect(Organic).toBeInTheDocument();
  //   // expect(Paid).toBeInTheDocument();
  //   // expect(AgentLed).toBeInTheDocument();
  //   expect(tooltip).toBeInTheDocument();

  // });
});

// Lead Table Testing
describe("render HomePage leadTable", () => {
  
  it("tableContent", () => {
    render(
      <Route>
        <HomePage isLoad={"false"} />
      </Route>
    );

    const tableContent = screen.getByTestId("table-mock");
    expect(tableContent).toBeInTheDocument();
  });
  it("table content row check", () => {
    render(
      <Route>
        <HomePage isLoad={"false"} />
      </Route>
    );

    const SLNo = screen.getByText('SL No.');
    const Source = screen.getByText('Source');
    const ToMyLife = screen.getByText('To MyLife');
    const Pending = screen.getByText('Pending');
    const Total = screen.getByText('Total');
    expect(SLNo).toBeInTheDocument();
    expect(Source).toBeInTheDocument();
    expect(ToMyLife).toBeInTheDocument();
    expect(Pending).toBeInTheDocument();
    expect(Total).toBeInTheDocument();
  });

});

