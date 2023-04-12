const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();

const deleteAllQueries = async () => {
    await prisma.user.deleteMany();
    await prisma.parking.deleteMany();
    await prisma.account.deleteMany();
    await prisma.manager.deleteMany();
};

deleteAllQueries();
