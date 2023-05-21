import Button from "@/components/button";
import Base64 from "crypto-js/enc-base64";
import sha256 from "crypto-js/sha256";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";
import PageHead from "../../components/head";
import InputField from "../../components/input_field";
import Main from "../../components/main";
import PhoneField from "../../components/phone_field";
import { trpc } from "../../lib/trpc/util-trpc";
import { signIn } from "next-auth/react";
import styles from "@/styles/pages/signup.module.scss";

export interface ISingUpProps {}

export default function SingUp(props: ISingUpProps) {
    const router = useRouter();
    const { provider, client_id, callbackURL: callbackUrl } = router.query;
    const client = trpc.registration;
    const [isFormValid, setFormValid] = useState(false);
    const formMutation = client.formValidation.useMutation();
    const phoneMutation = client.phoneValidation.useMutation();
    const phone = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const firstName = useRef<HTMLInputElement>(null);
    const secondName = useRef<HTMLInputElement>(null);

    const notEmptyValidator = (str: string, setError: Function) => {
        if (!str) {
            setError("Поле не должно быть пустым");
        } else {
            setError(null);
        }
    };
    const phoneValidator = async (str: string, setError: Function) => {
        const phoneSchema = z
            .string()
            .min(12, "Телефон должен содержать 12 знаков")
            .max(12, "Телефон должен содержать 12 знаков");
        try {
            phoneSchema.parse(str);
            setError(null);
        } catch (e) {
            setError(fromZodError(e as ZodError).message.split(": ")[1]);
            setFormValid(false);
            return;
        }
        try {
            await phoneMutation.mutateAsync(str).then((data) => {
                if (data.valid) {
                    setError(null);
                    setFormValid(true);
                } else {
                    setError(data.message);
                    setFormValid(false);
                }
            });
        } catch (e) {
            setFormValid(false);
        }
    };

    const passwordValidator = (str: string, setError: Function) => {
        const passwordSchema = z
            .string({
                required_error: "Обязательное поле",
            })
            .min(8, "Пароль должен содержать не менее 8 символов");
        const results = passwordSchema.safeParse(str);
        if (!results.success) {
            const newError = fromZodError(results.error).message.split(": ")[1];
            setError(newError);
            setFormValid(false);
        } else {
            setError(null);
            setFormValid(true);
        }
    };

    async function processForm(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        if (isFormValid) {
            await formMutation.mutate({
                firstName: firstName.current!.value,
                secondName: secondName.current!.value,
                phone: phone.current!.value,
                password: Base64.stringify(sha256(password.current!.value)),
                accountId: client_id && (client_id as string),
                accountProvider: provider && (provider as string),
            });

            signIn("credentials", {
                phone: phone.current!.value,
                password: password.current!.value,
                redirect: true,
                callbackUrl: callbackUrl as string,
            });
            if (provider && client_id) {
                signIn("credentials", {
                    phone: phone.current!.value,
                    password: password.current!.value,
                    redirect: true,
                    callbackUrl: callbackUrl as string,
                });
            }
        }
    }

    return (
        <>
            <PageHead title="Регистрация"></PageHead>
            <Main>
                <form className={styles.form}>
                    <InputField
                        testid="name"
                        ref={firstName}
                        label="Имя"
                        validator={notEmptyValidator}
                    ></InputField>
                    <InputField
                        testid="surname"
                        ref={secondName}
                        label="Фамилия"
                        validator={notEmptyValidator}
                    ></InputField>
                    <PhoneField
                        ref={phone}
                        label="Телефон"
                        validator={phoneValidator}
                    >
                        +7 (000) 000-00-00
                    </PhoneField>
                    <InputField
                        testid="password"
                        ref={password}
                        label="Пароль"
                        validator={passwordValidator}
                    ></InputField>
                    <Button
                        height="3rem"
                        type="submit"
                        style="primary"
                        disabled={!isFormValid}
                        onClick={processForm}
                    >
                        Зарегистрировать
                    </Button>
                </form>
            </Main>
        </>
    );
}
