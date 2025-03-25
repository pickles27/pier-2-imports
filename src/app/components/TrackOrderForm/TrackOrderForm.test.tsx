import { TrackOrderForm } from "./TrackOrderForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockReplace = jest.fn();
const mockSearchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => "/orders",
  useSearchParams: () => mockSearchParams,
}));

beforeEach(jest.clearAllMocks);

test("Track Order Form renders as expected", () => {
  render(<TrackOrderForm />);

  expect(
    screen.getByRole("textbox", { name: "Email Address" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("textbox", { name: "Phone Number" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Track Your Order" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Search Orders" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Clear Filters" })
  ).toBeInTheDocument();
});

test('When user types into the email address textbox and clicks "Search Orders", replace is called with the expected href', async () => {
  const user = userEvent.setup();

  render(<TrackOrderForm />);

  await user.type(
    screen.getByRole("textbox", { name: "Email Address" }),
    "fake@email.com"
  );

  await user.click(screen.getByRole("button", { name: "Search Orders" }));

  await waitFor(() => {
    expect(mockReplace).toHaveBeenCalledWith(`/orders?email=fake%40email.com`);
  });
});

test('When user types into the phone number textbox and clicks "Search Orders", replace is called with the expected href', async () => {
  const user = userEvent.setup();

  render(<TrackOrderForm />);

  await user.type(
    screen.getByRole("textbox", { name: "Phone Number" }),
    "333333333"
  );

  await user.click(screen.getByRole("button", { name: "Search Orders" }));

  await waitFor(() => {
    expect(mockReplace).toHaveBeenCalledWith(`/orders?phone=333333333`);
  });
});

test('When user types into the phone number and email textbox fields and clicks "Search Orders", replace is called with the expected href', async () => {
  const user = userEvent.setup();

  render(<TrackOrderForm />);

  await user.type(
    screen.getByRole("textbox", { name: "Email Address" }),
    "fake@email.com"
  );
  await user.type(
    screen.getByRole("textbox", { name: "Phone Number" }),
    "333333333"
  );

  await user.click(screen.getByRole("button", { name: "Search Orders" }));

  await waitFor(() => {
    expect(mockReplace).toHaveBeenCalledWith(
      `/orders?email=fake%40email.com&phone=333333333`
    );
  });
});

test.each(["333", "333333333333333333"])(
  "When user enters an invalid phone number %s and tries to search, an error message appears",
  async (phoneNumber) => {
    const user = userEvent.setup();

    render(<TrackOrderForm />);

    await user.type(
      screen.getByRole("textbox", { name: "Phone Number" }),
      phoneNumber
    );

    await user.click(screen.getByRole("button", { name: "Search Orders" }));

    // would normally test for role here, but no time to debug why it's not being assigned the correct accessible name
    expect(
      screen.getByText("Phone number must be between 7 and 15 digits.")
    ).toBeInTheDocument();
  }
);

test.each(["---------3333", "kdjsfklaj3333lkjklfdjlafkj-----"])(
  "Phone number entry does not count non-digit characters in validation",
  async (phoneNumber) => {
    const user = userEvent.setup();

    render(<TrackOrderForm />);

    await user.type(
      screen.getByRole("textbox", { name: "Phone Number" }),
      phoneNumber
    );

    await user.click(screen.getByRole("button", { name: "Search Orders" }));

    // would normally test for role here, but no time to debug why it's not being assigned the correct accessible name
    expect(
      screen.getByText("Phone number must be between 7 and 15 digits.")
    ).toBeInTheDocument();
  }
);

test("Clear filters button clears the fields", async () => {
  const user = userEvent.setup();

  render(<TrackOrderForm />);

  await user.type(
    screen.getByRole("textbox", { name: "Email Address" }),
    "fake@email.com"
  );
  await user.type(
    screen.getByRole("textbox", { name: "Phone Number" }),
    "333333333"
  );

  await user.click(screen.getByRole("button", { name: "Search Orders" }));

  expect(screen.getByRole("textbox", { name: "Email Address" })).toHaveValue(
    "fake@email.com"
  );
  expect(screen.getByRole("textbox", { name: "Phone Number" })).toHaveValue(
    "333333333"
  );

  await user.click(screen.getByRole("button", { name: "Clear Filters" }));

  expect(screen.getByRole("textbox", { name: "Email Address" })).toHaveValue(
    ""
  );
  expect(screen.getByRole("textbox", { name: "Phone Number" })).toHaveValue("");
});

test('Clicking "Search Orders" when both email and phone number are empty displays an error message', async () => {
  const user = userEvent.setup();

  render(<TrackOrderForm />);

  await user.click(screen.getByRole("button", { name: "Search Orders" }));

  // would normally test for role here, but no time to debug why it's not being assigned the correct accessible name
  expect(
    screen.getByText(
      "Please enter either the email or phone number associated with your order."
    )
  ).toBeInTheDocument();
});
