import Button from "@/components/button";
import InputField from "@/components/input_field";
import Main from "@/components/main";
import PhoneField from "@/components/phone_field";
import styles from "@/styles/pages/signin.module.scss";
import Base64 from "crypto-js/enc-base64";
import sha256 from "crypto-js/sha256";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";

export default function SignIn() {
    const router = useRouter() as any;
    const { error } = router.query;
    const [message, setError] = useState<string>("");
    const phone = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    
    const phoneSchema = z
        .string()
        .min(12, "Телефон должен содержать 12 знаков")
        .max(12, "Телефон должен содержать 12 знаков");

    const processForm = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (phone.current!.value && password.current!.value) {
            try {
                await signIn("credentials", {
                    phone: phone.current!.value,
                    password: Base64.stringify(sha256(password.current!.value)),
                    callbackUrl: "/",
                    redirect: true,
                });
            } catch (error: any) {
            }
        } else {
            setError("Неверный номер телефона и/или пароль");
        }
    };

    const phoneValidator = async (str: string, setInputError: Function) => {
        try {
            phoneSchema.parse(str);
            setInputError(null);
        } catch (e) {
            setInputError(fromZodError(e as ZodError).message.split(": ")[1]);
            return;
        }
    };

    const notEmptyValidator = (str: string, setInputError: Function) => {
        if (str == "") {
            setInputError("Поле не должно быть пустым");
            return;
        } else {
            setInputError(null);
        }
    };
    return (
        <Main>
            <div className={styles.index}>
                <div className={styles.logo_container}>
                    <div className={styles.logo}></div>
                    <div className={styles.brand}>Smart Parking</div>
                </div>
                <h1 className={styles.has_profile}>У вас уже есть аккаунт?</h1>
                <form className={styles.form}>
                    <PhoneField ref={phone} validator={phoneValidator}>
                        Номер телефона
                    </PhoneField>
                    <InputField
                        testid="password"
                        validator={notEmptyValidator}
                        type="password"
                        ref={password}
                    >
                        Пароль
                    </InputField>
                    <Button
                        type="button"
                        disabled={false}
                        style="primary"
                        onClick={processForm}
                    >
                        ВОЙТИ
                    </Button>
                    {error && (
                        <h4 className={styles.error}>
                            {error == "user_not_found"
                                ? "Пользователь с таким номером телефона не зарегистрирован"
                                : "Неверный номер телефона и/или пароль"}
                        </h4>
                    )}
                    <Link className={styles.signup} href="/user/signup">
                        <h4 className={styles.signup_text}>
                            Еще не зарегестрированы?
                        </h4>
                    </Link>
                </form>
            </div>
        </Main>
    );
}
