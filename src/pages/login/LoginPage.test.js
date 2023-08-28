// import { render, screen } from '@testing-library/react';
// import LoginPage from './LoginPage';

// test('renders learn react link', () => {
//     render(<LoginPage />);

//   });

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Message } from "antd";
import LoginPage from "./LoginPage";

// Mock the message component
jest.mock('antd',()=>({
  ...jest.requireActual('antd'),
  Message:{
    error : jest.fn(),
  },
}));

describe("Login Component", () => {
  it("renders login form correctly", () => {
    const { getByPlaceholderText, getByText } = render(<LoginPage />);
    const usernameInput = screen.getByPlaceholderText("Active Directory ID");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("LOGIN");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  // it("displays error message for invalid credentials", async () => {
  //   const { getByText, getByPlaceholderText, } = await render(<LoginPage />);
  //   const usernameInput = screen.getByPlaceholderText("Active Directory ID");
  //   const passwordInput = screen.getByPlaceholderText("Password");
  //   const loginButton = screen.getByText("LOGIN");

  //   fireEvent.change(usernameInput, {
  //     target: { value: "Username is required" },
  //   });
  //   fireEvent.change(passwordInput, {
  //     target: { value: "Password is required" },
  //   });
  //   fireEvent.click(loginButton);

  //   const errorMessage =  screen.getByTestId('login-error')
  //   expect(errorMessage).toBeInTheDocument();
  // });

  // it('calls onLogin with correct username for valid credentials', () => {
  //   const onLoginMock = jest.fn();
  //   const { getByPlaceholderText, getByText } = render(<LoginPage onLogin={onLoginMock} />);
  //   const usernameInput = screen.getByPlaceholderText('Active Directory ID');
  //   const passwordInput = screen.getByPlaceholderText('Password');
  //   const loginButton = screen.getByText('LOGIN');
  
  //   fireEvent.change(usernameInput, { target: { value: '' } });
  //   fireEvent.change(passwordInput, { target: { value: '' } });
  //   fireEvent.click(loginButton);
   
  //   expect(onLoginMock).toHaveBeenCalledWith();
  // });
});
