-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('SUCCESS', 'PENDING', 'REJECT');

-- CreateTable
CREATE TABLE "todos" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "status" "TodoStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "todos_created_at_idx" ON "todos"("created_at");
