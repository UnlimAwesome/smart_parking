import prisma from "../db/prisma"

class ParkingController{


    async refreshPlace(id: number, occupated: boolean){
        const placeFromDB = await prisma.place.findUnique({
            where:{
                id: id,
            }
        })

        if(!placeFromDB){
            throw new Error("wrong place id");
        }

        const place = await prisma.place.update({
            where:{
                id: id,
            },
            data:{
                occupated: occupated,
            }
        })
    }

    async updateCarHistory(number: string){

        const carFromDB = await prisma.car.findUnique({
            where:{
                id: number,
            }
        })

        let car;
        if (!carFromDB){
            car = await prisma.car.create({
                data:{
                    id: number,
                    Parking: {
                        create:{}
                    }
                }
            })
        }else{
            car = await prisma.car.update({
                where:{
                    id: number,
                },
                data:{
                    
                }
            })
        }

    }
    
}


const parkingController = new ParkingController()
export default parkingController