import clsx from "clsx";

export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
};

export const Button = ({
  children,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "w-full sm:w-fit text-md font-bold py-1 px-3 drop-shadow-md rounded-sm cursor-pointer",
        variant === "primary"
          ? "bg-foreground text-background outline-2 outline-black dark:outline-white focus:outline-yellow-500"
          : "bg-background text-foreground outline-2 outline-dark dark:outline-white focus:outline-yellow-500"
      )}
      {...props}
    >
      {children}
    </button>
  );
};
