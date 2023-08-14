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

  it("displays error message for invalid credentials", async () => {
    const mockOnLogin = jest.fn();
    // const massageErrorSpy = jest.spyOn(Message, "error").mockImplementation(() => {});
    const { getByPlaceholderText, getByText } = render(<LoginPage onLogin={mockOnLogin} />);
    const usernameInput = screen.getByPlaceholderText("Active Directory ID");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("LOGIN");

    fireEvent.change(usernameInput, {
      target: { value: "Username is required" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "Password is required" },
    });
    fireEvent.click(loginButton);

    // const errorMessage = screen.getByText('Authentication Failed!');
    // const errorMessage = screen.findAllByText('Authentication Failed!');
    // const errorMessage = massageErrorSpy.toHaveBeenCalledWith('Authentication Failed!');
    expect(mockOnLogin).toHaveBeenCalledWith("Authentication Failed!");
  });

  it('calls onLogin with correct username for valid credentials', () => {
    const mockOnLogin = jest.fn();
    const { getByPlaceholderText, getByText } = render(<LoginPage onLogin={mockOnLogin} />);
    const usernameInput = screen.getByPlaceholderText('Active Directory ID');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('LOGIN');

    fireEvent.change(usernameInput, {
      target: { value: "Username is required" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "Password is required" },
    });
    fireEvent.click(loginButton);

    expect(mockOnLogin).toHaveBeenCalledWith('user');
  });
});
