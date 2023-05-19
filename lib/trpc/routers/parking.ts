import prisma from "@/lib/db/prisma";
import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "../init";

export const parkingRouter = router({
    freePlaces: publicProcedure.query(async ({ input }) => {
        const count = await prisma.place.count({
            where: {
                occupated: false,
            },
        });
        return {
            count: count,
        };
    }),

    places: publicProcedure.query(async ()=>{
        const places = await prisma.place.findMany();
        return places;
    }),

    addNewCar: privateProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
            const { token } = ctx;
            const user = await prisma.user.update({
                where: {
                    phone: token.sub,
                },
                data: {
                    cars: {
                        create: {
                            id: input,
                        },
                    },
                },
            });
            const car = await prisma.car.findUnique({
                where: {
                    id: input,
                },
            });

            return car;
        }),

    myCars: privateProcedure.query(async ({ ctx }) => {
        const { token } = ctx;
        const cars = await prisma.car.findMany({
            where: {
                User: {
                    phone: token.sub,
                },
            },
        });
        return cars.map((car) => car.id);
    }),

    myPayments: privateProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
            const { token } = ctx;
            let car;
            let payments;
            if (input == "") {
                car = await prisma.car.findFirst({
                    where: {
                        User: {
                            phone: token.sub,
                        },
                    },
                });
                if (!car) {
                    throw new Error();
                }
                payments = await prisma.parking.findMany({
                    where: {
                        car: {
                            id: car.id,
                        },
                        exit: { not: null },
                    },
                });
            } else {
                payments = await prisma.parking.findMany({
                    where: {
                        car: {
                            id: input,
                        },
                        exit: { not: null },
                    },
                });
            }

            return payments.map((payment) => {
                const date = payment.entry;
                let stringDate =
                    date.getDate() +
                    "." +
                    date.getMonth() +
                    "." +
                    date.getFullYear();
                return {
                    date: stringDate,
                    cost: payment.cost as number,
                    payed: payment.payed,
                };
            });
        }),

    myStats: privateProcedure.query(async ({ ctx }) => {
        const { token } = ctx;
        const cars = await prisma.car.findMany({
            where: {
                User: {
                    phone: token.sub,
                },
            },
            select: {
                id: true,
            },
        });
        let hours = 0;
        cars.map(async (car) => {
            let intervals = await prisma.parking.findMany({
                where:{
                    carId: car.id,
                    exit: {not: null},
                },
                select:{
                    entry: true,
                    exit: true,
                }
            })
            intervals.map((interval)=>{
               hours += (interval.exit!.valueOf() - interval.entry.valueOf())/1000/60/60
            })
        });
        return {totalTime: hours};
    }),
});
