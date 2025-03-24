"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, TextField } from "../designSystem";

export const TrackOrderForm = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const initialEmail = searchParams.get("email") ?? "";
    const initialPhone = searchParams.get("phone") ?? "";

    setEmail(initialEmail);
    setPhone(initialPhone);
  }, [searchParams]);

  const handleClearFilters = () => {
    setEmail("");
    setPhone("");
    setErrorMessage("");
    router.replace(`${pathname}`);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setErrorMessage("");
      setIsLoading(true);

      const phoneDigits = phone?.replace(/\D/g, "") ?? "";

      if (!email && !phoneDigits) {
        setErrorMessage(
          "Please enter either the email or phone number associated with your order."
        );
        return;
      }

      if (phoneDigits && (phoneDigits.length < 7 || phoneDigits.length > 15)) {
        setErrorMessage("Phone number must be between 7 and 15 digits.");
        return;
      }

      const params = new URLSearchParams();
      if (email) {
        params.set("email", email);
      } else {
        params.delete("email");
      }
      if (phoneDigits) {
        params.set("phone", phoneDigits);
      } else {
        params.delete("phone");
      }

      router.replace(`${pathname}?${params.toString()}`);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Encountered an unexpected error. Please verify the information you entered. If the problem persists, contact customer service at 333-333-3333."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-background rounded-md drop-shadow-sm p-8"
    >
      <fieldset className="flex flex-col gap-6 bg-background">
        <div>
          <legend>
            <h2 className="text-lg font-bold">Track Your Order</h2>
          </legend>
          {errorMessage && (
            <span
              className="text-md text-red-700 dark:text-red-300"
              role="alert"
            >
              {errorMessage}
            </span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <TextField
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            title="Make sure the email address you enter is valid, or try searching by phone number."
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span className="mt-auto font-bold">OR</span>
          <TextField
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            title="Enter a valid phone number (7-15 digits). Spaces, dashes, parentheses, and an optional '+' are allowed."
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button type="submit" disabled={isLoading}>
            Search Orders
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </div>
      </fieldset>
    </form>
  );
};
