-- CreateTable
CREATE TABLE "BillingType" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "BillingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "billCompany" TEXT,
    "city" TEXT NOT NULL,
    "zip" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "vatNumber" TEXT,
    "children" TEXT NOT NULL,
    "childrenMail" TEXT,
    "mobile" TEXT NOT NULL,
    "billingTypeId" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_billingTypeId_fkey" FOREIGN KEY ("billingTypeId") REFERENCES "BillingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
