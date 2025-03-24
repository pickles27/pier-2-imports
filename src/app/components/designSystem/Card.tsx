export type CardProps = React.ComponentProps<"div">;

export const Card = ({ children, ...props }: CardProps) => (
  <div
    className="w-full text-wrap bg-background rounded-md drop-shadow-sm p-8"
    {...props}
  >
    {children}
  </div>
);
