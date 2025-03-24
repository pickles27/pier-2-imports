/**
 * Formats an iso string into the format January 01, 1970.
 * If the iso string is invalid or missing, returns "Invalid Date"
 * */
export const formatDate = (isoString: string | undefined | null) => {
  const date = new Date(isoString ?? "invalid");

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
