import prisma from "@/lib/db/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const bcrypt = require("bcrypt")

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { phone, password } = credentials as any;
                try {
                    const userFromDB = await prisma.user.findUnique({
                        where: {
                            phone: phone,
                        },
                    });
                    if(!userFromDB){
                        throw new Error("user_not_found");
                    }
                    const valid = await bcrypt.compare(
                        password,
                        userFromDB.password
                    );
                    if (valid) {
                        const hash = await bcrypt.hash(password, 7);
                        const user = {
                            id: userFromDB!.phone,
                            password: hash,
                        };
                        return user;
                    }
                } catch (error: any) {
                    throw new Error(error.message);
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 2 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/user/signin",
        error: "/user/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);