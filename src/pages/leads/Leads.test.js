import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import LeadsPage from "./LeadsPage";

describe("Initialized Component", () => {
    it("Check LeadPage", () => {
      render(
        <Router>
          <LeadsPage isLoad={"false"} />
        </Router>
      );
  
      const label = screen.getByTestId("leads-mock");
      expect(label.textContent).toBe("Lead Submission");
    });

    it("Mobile number search input triggers API call on Search Lead",()=>{
      render(
        <Router>
          <LeadsPage isLoad={"false"} />
        </Router>
      );

    })
})