import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
test("renders learn react link", () => {
  render(
  <Router><Layout/> </Router> );
});
