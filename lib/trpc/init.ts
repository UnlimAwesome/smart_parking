import { TRPCError, initTRPC, inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getToken } from "next-auth/jwt";

export const createContext = async (opts: CreateNextContextOptions) => {
    const token = await getToken({
        req: opts.req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    console.log("create Context token: ", token);
    return {
        ...opts,
        token,
    };
};

const t = initTRPC
    .context<inferAsyncReturnType<typeof createContext>>()
    .create();

export const middleware = t.middleware;
export const router = t.router;

const withAuth = middleware(async ({ next, ctx }) => {
    if (!ctx.token) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
        });
    }
    return next({
        ctx: {
            token: ctx.token,
        },
    });
});

export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(withAuth);
