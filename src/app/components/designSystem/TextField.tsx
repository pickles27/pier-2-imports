export type TextFieldProps = React.ComponentProps<"input"> & {
  label: string;
};

export const TextField = ({ label, ...props }: TextFieldProps) => (
  <label className="w-full flex flex-col gap-3">
    <span className="text-sm font-bold">{label}</span>
    <input
      className="w-full bg-white text-black py-1 px-3 rounded-sm outline-2 outline-gray-200 focus:outline-yellow-500 shadow-xs"
      {...props}
    />
  </label>
);
