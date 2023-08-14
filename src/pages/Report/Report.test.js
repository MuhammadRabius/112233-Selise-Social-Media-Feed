import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Report from "./Report";

beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  
test("Reports Download on ec", () => {
  render(
    <BrowserRouter>
      <Report />
    </BrowserRouter>
  );

 
});
