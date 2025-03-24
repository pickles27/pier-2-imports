export type FooterProps = {
  label: string;
};
export const Footer = ({ label }: FooterProps) => (
  <footer className="fixed w-full bottom-0 flex justify-center items-center text-center p-4 bg-inherit drop-shadow-[0_-1px_1px_rgba(0,0,0,0.05)]">
    <p>{label}</p>
  </footer>
);
