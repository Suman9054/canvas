/*
  Warnings:

  - You are about to drop the `_UserToworkspace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserToworkspace" DROP CONSTRAINT "_UserToworkspace_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToworkspace" DROP CONSTRAINT "_UserToworkspace_B_fkey";

-- DropTable
DROP TABLE "_UserToworkspace";

-- CreateTable
CREATE TABLE "_UserWorkspaces" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserWorkspaces_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserWorkspaces_B_index" ON "_UserWorkspaces"("B");

-- AddForeignKey
ALTER TABLE "_UserWorkspaces" ADD CONSTRAINT "_UserWorkspaces_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserWorkspaces" ADD CONSTRAINT "_UserWorkspaces_B_fkey" FOREIGN KEY ("B") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
