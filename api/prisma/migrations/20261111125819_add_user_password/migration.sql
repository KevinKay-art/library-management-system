-- Add totalCopies to Book
ALTER TABLE "Book"
ADD COLUMN "totalCopies" INTEGER NOT NULL DEFAULT 1;

-- Add password column as nullable first
ALTER TABLE "User"
ADD COLUMN "password" TEXT;

-- Set a temporary bcrypt password for existing users
UPDATE "User"
SET "password" = '$2b$10$G0I2IBwPG2r.U3SU0lT1.OcifI.Yxh.7WOcuaKejS8POWO8WptI.G'
WHERE "password" IS NULL;

-- Make password required
ALTER TABLE "User"
ALTER COLUMN "password" SET NOT NULL;
