import * as React from "react";
import styles from "@/styles/components/button.module.scss";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface IButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    style?: string;
    disabled: boolean;
    children: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: IButtonProps) {
    return (
        <div className={styles.container}>
            <button
                onClick={props.onClick}
                className={styles[`${props.style}`]}
                type={props.type}
            >
                {props.children}
            </button>
        </div>
    );
}
