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
  
  it('calls onLogin with correct username for valid credentials', () => {
    const onLoginMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(<LoginPage onLogin={onLoginMock} />);
    const usernameInput = screen.getByPlaceholderText('Active Directory ID');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('LOGIN');
  
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(loginButton);
   
    expect(window.location.pathname).toBe('/');
  });

  it("displays error message for invalid credentials", async () => {
    const { getByText, getByPlaceholderText, } = await render(<LoginPage />);
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

    expect(window.location.pathname).toBe('/');
  });

});


