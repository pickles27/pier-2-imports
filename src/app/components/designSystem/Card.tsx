import clsx from "clsx";

export type CardProps = React.ComponentProps<"div"> & {
  padding?: number;
};

export const Card = ({ children, padding = 8, ...props }: CardProps) => (
  <section
    className={clsx(
      "w-full overflow-hidden bg-background rounded-md drop-shadow-sm",
      `p-${padding}`
    )}
    {...props}
  >
    {children}
  </section>
);
