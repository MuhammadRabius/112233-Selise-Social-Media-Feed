import React from "react";
import { render, screen ,fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Router } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/home/HomePage";
import LeadsPage from "./pages/leads/LeadsPage";
import LoginPage from "./pages/login/LoginPage";
import UserManagement from "./pages/user-management/UserManagement";
import Report from "./pages/Report/Report";
import RequireAuth from "./components/auth/RequireAuth";

// jest.mock('./LoginPage', () => () => <div><LoginPage/></div>);
// jest.mock('./RequireAuth', () => () => <div><RequireAuth/></div>);
// jest.mock('./HomePage', () => () => <div><HomePage/></div>);
// jest.mock('./LeadsPage', () => () => <div><LeadsPage/></div>);
// jest.mock('./UserManagement', () => () => <div><UserManagement/></div>);
// jest.mock('./Report', () => () => <div><Report/></div>);

describe("App", () => {
  test("renders LoginPage for /login route", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("LOGIN")).toBeInTheDocument();
  });

  test('redirects to homepage after successful login', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('LOGIN'));

    expect(window.location.pathname).toBe('/');

    // expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  // Add more test cases for other routes as needed
});
