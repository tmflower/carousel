import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";


test('it renders without crashing', () => {
  render(<Carousel />);
});

test('it matches snapshot', () => {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
});

it("shows left arrow on all but first image", function() {
  const { queryByTestId } = render(<Carousel />);  
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  // expect not to see the left arrow on first image
  expect(leftArrow).not.toBeVisible();
  fireEvent.click(rightArrow);
  // expect to see the left arrow on 2nd and 3rd images
  expect(leftArrow).toBeVisible();
  fireEvent.click(rightArrow);
  expect(leftArrow).toBeVisible();
});

it("shows right arrow on all except last image", function() {
  const { queryByTestId } = render(<Carousel />);  
  const rightArrow = queryByTestId("right-arrow");

  // expect to see the right arrow on first and second images
  expect(rightArrow).toBeVisible();
  fireEvent.click(rightArrow);
  expect(rightArrow).toBeVisible();
  // expect not to see the right arrow on the last(third) image
  fireEvent.click(rightArrow);
  expect(rightArrow).not.toBeVisible();
});
