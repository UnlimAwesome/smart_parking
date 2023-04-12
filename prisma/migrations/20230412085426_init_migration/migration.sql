-- CreateTable
CREATE TABLE "Manager" (
    "login" TEXT NOT NULL,
    "secret" TEXT NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("login")
);

-- CreateTable
CREATE TABLE "User" (
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cars" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("phone")
);

-- CreateTable
CREATE TABLE "Parking" (
    "car" TEXT NOT NULL,
    "entry" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exit" TIMESTAMP(3),
    "cost" DOUBLE PRECISION,
    "payd" BOOLEAN,

    CONSTRAINT "Parking_pkey" PRIMARY KEY ("car")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "secondName" TEXT NOT NULL,
    "image" TEXT,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "userPhone" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manager_login_key" ON "Manager"("login");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Parking_car_key" ON "Parking"("car");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userPhone_fkey" FOREIGN KEY ("userPhone") REFERENCES "User"("phone") ON DELETE SET NULL ON UPDATE CASCADE;
