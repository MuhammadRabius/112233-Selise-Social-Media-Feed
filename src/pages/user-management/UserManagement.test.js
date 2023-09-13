import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import UserManagement from "./UserManagement";

describe("Check Content", () => {
  it("Check User Management Text", () => {
    render(
      <Router>
        <UserManagement isLoad={"false"} />
      </Router>
    );

    const label = screen.getByTestId("um-mock");
    expect(label.textContent).toBe("User Management");
  });

  it("render Form all Components", () => {
    render(
      <Router>
      <UserManagement isLoad={"false"} />
      </Router>
    );
    const username =screen.getByTestId("username-mock");
    const department = screen.getByTestId("dep-mock");
    const role = screen.getByTestId("role-mock");
    const email = screen.getByTestId("email-mock");
    const location = screen.getByTestId("location-mock");
   
    expect(username).toBeInTheDocument();
    expect(department).toBeInTheDocument();
    expect(role).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(location).toBeInTheDocument();
    
    
  });
});



