import { render,screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { message } from 'antd';

import { Formik, Form } from 'formik';
import LoginPage from './LoginPage';


jest.mock('antd', () => ({
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Login Page', () => {
  test('submits the form successfully', async () => {
    const userLoginMock = jest.fn(); // Mock the userLogin function

    // Render the component
    const { getByLabelText, getByText, getByTestId } = render(
      <LoginPage userLogin={userLoginMock} />
    );

    // Fill in the form inputs
    fireEvent.change(screen.getByPlaceholderText('Active Directory ID'), {
      target: { value: 'username' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });

    // Mock the successful userLogin response
    const successfulResponse = {
      data: {
        status: true,
        message: 'Login successful',
        data: {
          token: 'your-access-token',
          username: 'username',
        },
      },
    };
    userLoginMock.mockResolvedValue(successfulResponse);

    await act(async () => {
      // Submit the form
      fireEvent.submit(screen.getByText('LOGIN'));
    });

    // Assertions
    // expect(message.success).toHaveBeenCalledWith('Login successful');
    expect(window.location.pathname).toBe('/');
    expect(message.error).not.toHaveBeenCalled();
    // You can add more assertions based on the expected behavior after form submission
  });

  test('displays error message on login failure', async () => {
    const userLoginMock = jest.fn(); // Mock the userLogin function

    // Render the component
    const { getByLabelText, getByTestId, getByText } = render(
      <LoginPage userLogin={userLoginMock} />
    );

    // Fill in the form inputs
    fireEvent.change(screen.getByPlaceholderText('Active Directory ID'), {
      target: { value: 'username' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });

    // Mock the failed userLogin response
    const failedResponse = {
      data: {
        status: false,
        message: 'Authentication failed!',
      },
    };
    userLoginMock.mockResolvedValue(failedResponse);

    await act(async () => {
      // Submit the form
      fireEvent.submit(screen.getByText('LOGIN'));
    });

    // Assertions
    // expect(userLoginMock).toHaveBeenCalledWith({
    //   username: 'rabiussanym',
    //   password: 'Cse491093',
    // });
    expect(message.error).toHaveBeenCalledTimes(1);
    // expect(message.error).toHaveBeenCalledWith('Authentication failed!');
  });
});