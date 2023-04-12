import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";
import VkProvider from "next-auth/providers/vk";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        YandexProvider({
            clientId: process.env.YANDEX_ID!,
            clientSecret: process.env.YANDEX_SECRET!,
        }),
        VkProvider({
            clientId: process.env.VK_ID!,
            clientSecret: process.env.VK_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials, req) {
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 2 * 24 * 60 * 60,
    },
    pages: {
        signIn: "auth/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);