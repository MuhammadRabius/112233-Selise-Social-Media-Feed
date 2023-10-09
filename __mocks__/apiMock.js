export const searchMobileNumber = jest.fn().mockImplementation((number) => {
    return Promise.resolve({ success: true, data: number });
  });