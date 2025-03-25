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
        "w-full sm:w-fit text-md font-bold py-1 px-3 drop-shadow-md rounded-sm cursor-pointer focus:outline-yellow-500",
        variant === "primary"
          ? "bg-foreground text-background outline-2 outline-black hover:bg-gray-800"
          : "bg-background text-foreground outline-2 outline-dark hover:bg-gray-200"
      )}
      {...props}
    >
      {children}
    </button>
  );
};
