import prisma from "@/lib/db/prisma";
import { z } from "zod";
import { privateProcedure, router } from "../init";

export const userRouter = router({
    profile: privateProcedure.output(z.object({
        phone: z.string(),
        firstName: z.string(),
        secondName: z.string(),
    })).query(async(ctx)=>{
        const user = await prisma.user.findUnique({
            where:{
                phone: ctx.ctx.token.sub,
            }
        })
        return{
            phone: user!.phone,
            firstName: user!.firstName,
            secondName: user!.secondName,
        }
    })
})