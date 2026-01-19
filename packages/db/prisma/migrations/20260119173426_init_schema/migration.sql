-- CreateTable
CREATE TABLE "userschema" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dataandtime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userschema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contentschema" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "Link" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "dataandtime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contentschema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userschema_username_key" ON "userschema"("username");

-- CreateIndex
CREATE UNIQUE INDEX "contentschema_userid_key" ON "contentschema"("userid");

-- AddForeignKey
ALTER TABLE "contentschema" ADD CONSTRAINT "contentschema_userid_fkey" FOREIGN KEY ("userid") REFERENCES "userschema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
