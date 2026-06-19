import * as React from "react";
import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import Login from "../pages/Login";

describe("Login Component", () => {

  test("renders login heading", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(
      screen.getByText(
        "Student Login"
      )
    ).toBeInTheDocument();
  });

  test("renders email input", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(
      screen.getByPlaceholderText(
        "Enter Email"
      )
    ).toBeInTheDocument();
  });

  test("renders password input", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(
      screen.getByPlaceholderText(
        "Enter Password"
      )
    ).toBeInTheDocument();
  });

  test("renders login button", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(
      screen.getByRole(
        "button",
        {
          name: /login/i,
        }
      )
    ).toBeInTheDocument();
  });

  test("shows email required validation", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: /login/i,
        }
      )
    );

    expect(
      screen.getByText(
        "Email is required"
      )
    ).toBeInTheDocument();
  });

  test("shows password required validation", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText(
        "Enter Email"
      ),
      {
        target: {
          value:
            "test@gmail.com",
        },
      }
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: /login/i,
        }
      )
    );

    expect(
      screen.getByText(
        "Password is required"
      )
    ).toBeInTheDocument();
  });

});