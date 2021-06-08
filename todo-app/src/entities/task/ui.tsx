import type { PropsWithChildren } from "react";
import { Card } from "antd"; // ~ "shared/ui/card"

export type TaskCardProps = PropsWithChildren<{
    data: import("shared/api").Task;
}> & import("antd").CardProps;

export const TaskCard = ({ data, children, ...cardProps }: TaskCardProps) => (
    <Card 
        title={data.title} 
        {...cardProps}
    >
        {children}
    </Card>
);
