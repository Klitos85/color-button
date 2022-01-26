import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

test("button has correct initial color", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(colorButton).toBeEnabled();

  const checkBox = screen.getByRole("checkbox");
  expect(checkBox).not.toBeChecked();
});

test("checkBox functionality", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkBox = screen.getByRole("checkbox", { name: "Disable button" });

  fireEvent.click(checkBox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkBox);
  expect(colorButton).toBeEnabled();
});

test("disabled check and button background change from red to gray", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkBox = screen.getByRole("checkbox", { name: "Disable button" });

  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("disabled check and button background change from blue to gray", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkBox = screen.getByRole("checkbox", { name: "Disable button" });

  fireEvent.click(colorButton);
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("spaces before camel-case capital letters", () => {
  it("works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });

  it("works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MightnightBlue")).toBe("Mightnight Blue");
  });

  it("works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
