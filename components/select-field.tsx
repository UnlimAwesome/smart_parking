import { ChangeEventHandler, ReactNode, SelectHTMLAttributes } from "react";
import styles from "../styles/components/input-field.module.scss";
export type option = {
    label: string;
    value: string;
};

export interface ISelectProps {
    value?: string;
    label?: string;
    options?: any[];
    onChange?: ChangeEventHandler<HTMLSelectElement>;
}

export function Select(props: ISelectProps) {
    return (
        <div className={styles.inputfield}>
            {props.label && <h4 className={styles.label}>{props.label}</h4>}
            <select className={styles.text} onChange={props.onChange} value={props.value}>
                {props.options?.map((option) => {
                        return <option value={option.value} key={option.value}>
                        {option.label}
                    </option>;
                    })}
            </select>
        </div>
    );
}
