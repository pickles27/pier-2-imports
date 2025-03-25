import { ReactNode } from "react";
import { Card } from "../../designSystem";

export type BaseDetailCardProps = {
  title: string;
  children: ReactNode;
};

export const BaseDetailCard = ({ title, children }: BaseDetailCardProps) => {
  return (
    <Card padding={4}>
      <div className="flex flex-col gap-2">
        <h4 className="font-bold">{title}</h4>
        {children}
      </div>
    </Card>
  );
};
