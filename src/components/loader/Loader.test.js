import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Router } from "react-router-dom";
import Loader from "./Loader";

describe("Loader", () => {
  test("renders LoginPage for /login route", () => {
    render(<Loader />);
    const element = screen.getByTestId("loader-mock")
    expect(element).toBeInTheDocument();
  });
});
