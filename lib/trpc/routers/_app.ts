import { router } from "../init";
import { registrationRouter } from "./registration";
import { userRouter } from "./user";

export const appRouter = router({
    user: userRouter,
    registration: registrationRouter,
});


export type AppRouter = typeof appRouter;
