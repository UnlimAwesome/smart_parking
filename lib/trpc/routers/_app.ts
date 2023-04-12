import { router } from "../init";
import { registrationRouter } from "./registration";

export const appRouter = router({
    registration: registrationRouter,
});

export type AppRouter = typeof appRouter;
