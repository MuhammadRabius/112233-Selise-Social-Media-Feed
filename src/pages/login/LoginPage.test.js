import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import LoginPage from "./LoginPage";


jest.mock('antd',()=>({
  ...jest.requireActual('antd'),
  Message:{
    error : jest.fn(),
  },
}));


let assignMock = jest.fn();

delete window.location;
window.location = { assign: assignMock };

afterEach(() => {
  assignMock.mockClear();
});


it("Check Login", () => {
  render(
    <Router>
      <LoginPage isLoad={"false"} />
    </Router>
  );

  const label = screen.getByTestId("login-mock");
  expect(label).toHaveClass('login-container');
});

