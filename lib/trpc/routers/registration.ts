import prisma from "@/lib/db/prisma";
import { z } from "zod";
import { procedure, router } from "../init";

export const registrationRouter = router({
    phoneValidation: procedure.input(z.string()).mutation(async ({ input }) => {
        const user = await prisma.user.findUnique({
                where: {
                    phone: input,
                },
            });
        if (!user) {
            return {
                valid: true,
                message: "",
            };
        } else {
            return {
                valid: false,
                message: "Пользователь с таким номером уже зарегистрирован",
            };
        }
    }),

    formValidation: procedure
        .input(
            z.object({
                firstName: z.string(),
                secondName: z.string(),
                phone: z.string(),
                password: z.string(),
                accountProvider: z.string().optional(),
                accountId: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const {
                firstName,
                secondName,
                phone,
                password,
                accountProvider,
                accountId,
            } = input;
            try {
                const user = await prisma.user.create({
                    data: {
                        firstName: firstName,
                        secondName: secondName,
                        password: password,
                        phone: phone,
                    },
                });
                console.log("user", user)
                if (accountProvider && accountId) {
                    const account = await prisma.account.update({
                        where: {
                            provider_providerAccountId: {
                                provider: accountProvider,
                                providerAccountId: accountId,
                            },
                        },
                        data: {
                            User: {
                                connect:{
                                    phone: phone,
                                }
                            }
                        },
                    });
                }
            } catch (err) {
                console.log(err);
                return err;
            }
        }),
});
