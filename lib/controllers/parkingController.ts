import prisma from "../db/prisma";

class ParkingController {
    async refreshPlace(id: number, occupated: boolean) {
        const placeFromDB = await prisma.place.findUnique({
            where: {
                id: id,
            },
        });

        if (!placeFromDB) {
            throw new Error("wrong place id");
        }

        if (occupated == placeFromDB.occupated) {
            throw new Error(
                `place is already ${occupated ? "occupated" : "free"}`
            );
        }

        const place = await prisma.place.update({
            where: {
                id: id,
            },
            data: {
                occupated: occupated,
            },
        });

        return place;
    }

    async updateCarHistory(number: string, process: "entry" | "exit") {

        const carFromDB = await prisma.car.findUnique({
            where: {
                id: number,
            },
        });

        if (process == "exit" && !carFromDB) {
            throw new Error("Car didn't enter the parking");
        }

        let car;
        let parkingfromDB;
        switch (process) {
            case "entry":
                if (!carFromDB) {
                    car = await prisma.car.create({
                        data: {
                            id: number,
                            Parking: {
                                create: {},
                            },
                        },
                    });
                    parkingfromDB = await prisma.parking.findFirst({
                        where: {
                            carId: car.id,
                            exit: null,
                        },
                    });
                    return parkingfromDB;
                } else {
                    parkingfromDB = await prisma.parking.findFirst({
                        where: {
                            carId: carFromDB.id,
                            exit: null,
                        },
                    });

                    if(parkingfromDB){
                        throw new Error(`car is already on the parking`)
                    }

                    const parking = await prisma.parking.create({
                        data: {
                            car: {
                                connect: {
                                    id: number,
                                },
                            },
                        },
                    });
                    return parking;
                }


            case "exit":
                parkingfromDB = await prisma.parking.findFirst({
                    where: {
                        carId: carFromDB!.id,
                        exit: null,
                    },
                });

                if(!parkingfromDB){
                    throw new Error("car was not on the parking");
                }

                const actualDateTime = new Date()
                const diff = (actualDateTime.valueOf() - parkingfromDB.entry.valueOf())/1000/60
                const cost = Math.round(diff * 2)
                const parking = await prisma.parking.update({
                    where: {
                        id: parkingfromDB!.id,
                    },
                    data: {
                        exit: actualDateTime,
                        cost: cost,
                    },
                });
                return parking;
        }
    }
}

const parkingController = new ParkingController();
export default parkingController;
