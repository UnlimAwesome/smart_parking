import {
    useEffect,
    useState,
    forwardRef,
    MutableRefObject,
    ForwardedRef,
} from "react";
import styles from "../styles/components/input-field.module.scss";

export interface IInputFieldProps {
    label?: string;
    children?: string;
    validator?: (str: string, setError: Function) => void;
}

function useDebounceValue(value: string, time = 500) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value);
        }, time);
        return () => {
            clearTimeout(timeout);
        };
    }, [value, time]);
    return debounceValue;
}

// eslint-disable-next-line react/display-name
const PhoneField = forwardRef(
    (
        props: IInputFieldProps,
        ref?:
            | ForwardedRef<HTMLInputElement>
            | MutableRefObject<HTMLInputElement>
    ) => {
        const [query, setQuery] = useState("");
        const debounceQuery = useDebounceValue(query);
        const [error, setError] = useState("");

        useEffect(() => {
            if (props.validator) {
                props.validator(debounceQuery, setError);
            }
        }, [debounceQuery]);

        useEffect(() => {
            if (ref) {
                const input = (ref as MutableRefObject<HTMLInputElement>)
                    .current;
                if (error) {
                    input.setAttribute("invalid", "");
                } else {
                    input.removeAttribute("invalid");
                }
            }
        }, [error]);

        return (
            <div className={styles.inputfield}>
                {props.label && <h4 className={styles.label}>{props.label}</h4>}
                <input
                    value={query}
                    type="text"
                    ref={ref}
                    className={styles.text}
                    placeholder={props.children}
                    onChange={(e) => {
                        setQuery(() => {
                            if(e.target.value.startsWith("7") || e.target.value.startsWith("8")){
                                return ("+7")
                            }
                            if (!e.target.value.startsWith("+7")) {
                                if (!e.target.value.startsWith("+")) {
                                    return ("+7" + e.target.value)
                                        .replaceAll(/[A-Za-zА-Яа-я]/g, "")
                                        .substring(0, 12);
                                } else {
                                    return (
                                        "+7" +
                                        e.target.value
                                            .replaceAll(/[A-Za-zА-Яа-я]/g, "")
                                            .replaceAll("+", "")
                                    ).substring(0, 12);
                                }
                            } else {
                                return e.target.value
                                    .replaceAll(/[A-Za-zА-Яа-я]/g, "")
                                    .substring(0, 12);
                            }
                        });
                    }}
                ></input>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        );
    }
);

export default PhoneField;
