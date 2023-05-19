import {
    ForwardedRef,
    MutableRefObject,
    forwardRef,
    useEffect,
    useState,
} from "react";
import styles from "../styles/components/input-field.module.scss";

export interface IInputFieldProps {
    testid?: string;
    autocomplete?: string;
    type?: string;
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
const InputField = forwardRef(
    (
        props: IInputFieldProps,
        ref?:
            | ForwardedRef<HTMLInputElement>
            | MutableRefObject<HTMLInputElement>
    ) => {
        const [query, setQuery] = useState("");
        const debounceQuery = useDebounceValue(query);
        const [error, setError] = useState("");

        useEffect(()=>{
            
        })
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
                    data-testid={`${props.testid}-field`}
                    autoComplete={props.autocomplete}
                    type={props.type ?? "text"}
                    ref={ref}
                    className={styles.text}
                    placeholder={props.children}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                ></input>
                {error && (
                    <p
                        data-testid={`${props.testid}-error`}
                        className={styles.error}
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

export default InputField;
