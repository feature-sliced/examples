import type { PropsWithChildren, ReactNode } from "react";
import cn from "classnames"; // Можно смело использовать аналоги
import { Row } from "antd"; // ~ "shared/ui/row"
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export type TaskRowProps = PropsWithChildren<{
    data: import("shared/api").Task;
    titleHref?: string;
    before?: ReactNode;
}>;

export const TaskRow = ({ data, before, titleHref }: TaskRowProps) => {
    const title = titleHref ? <Link to={titleHref}>{data.title}</Link> : data.title

    return (
        // Можно смело использовать classnames и аналоги
        <Row className={cn(styles.root, { [styles.completed]: data.completed })}>
            {before}
            {title}
        </Row>
    )
}