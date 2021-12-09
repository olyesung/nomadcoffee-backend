-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "slug" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CoffeeShop" ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CoffeeShopPhoto" ALTER COLUMN "url" DROP NOT NULL;
