import prisma from "@/lib/db/prisma";
import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "../init";

export const parkingRouter = router({
    freePlaces: publicProcedure.query(async({input})=>{
        const count = await prisma.place.count({
            where:{
                occupated: false,
            }
        })
        return{
            count: count,
        }
    }),

    addNewCar: privateProcedure.input(z.string()).mutation(async ({input, ctx})=>{
        const {token} = ctx;
        const user = await prisma.user.update({
            where:{
                phone: token.sub,
            },
            data:{
                cars:{
                    create:{
                        id: input,
                    }
                }
            }
        })
        const car = await prisma.car.findUnique({
            where:{
                id: input,
            }
        })

        return car;
    }),

    myCars: privateProcedure.query(async ({ctx})=>{
        const {token} = ctx;
        const cars = await prisma.car.findMany({
            where:{
                User:{
                    phone: token.sub,
                }
            }
        })
        console.log(cars)
        return cars.map((car)=>car.id)
    })
})