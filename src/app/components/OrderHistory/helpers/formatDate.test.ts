import { formatDate } from "./formatDate";

test.each([undefined, null, "some random string"])(
  "returns Invalid Date string for invalid inputs",
  (input) => {
    const result = formatDate(input);

    expect(result).toBe("Invalid Date");
  }
);

test.each([
  ["2022-01-16T00:00:00Z", "January 16, 2022"],
  ["2023-07-04T12:30:00Z", "July 4, 2023"],
  ["2024-12-25T23:59:59Z", "December 25, 2024"],
  ["2020-02-29T00:00:00Z", "February 29, 2020"],
  ["1999-11-01T08:00:00Z", "November 1, 1999"],
  ["2030-01-01T00:00:00Z", "January 1, 2030"],
])("returns the expected result", (input, expected) => {
  const result = formatDate(input);

  expect(result).toBe(expected);
});
