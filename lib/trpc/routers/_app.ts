import { router } from "../init";
import { parkingRouter } from "./parking";
import { registrationRouter } from "./registration";
import { userRouter } from "./user";

export const appRouter = router({
    user: userRouter,
    registration: registrationRouter,
    parking: parkingRouter,
});


export type AppRouter = typeof appRouter;
