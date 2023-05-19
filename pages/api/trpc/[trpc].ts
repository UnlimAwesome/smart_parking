import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../lib/trpc/routers/_app";
import { createContext } from "@/lib/trpc/init";

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext,
});
