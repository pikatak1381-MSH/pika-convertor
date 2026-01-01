-- AlterTable
ALTER TABLE "CalculatorContent" ADD COLUMN     "canonicalUrl" VARCHAR(500),
ADD COLUMN     "focusKeyword" VARCHAR(100),
ADD COLUMN     "noFollow" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "noIndex" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ogDescription" VARCHAR(200),
ADD COLUMN     "ogImage" VARCHAR(500),
ADD COLUMN     "ogTitle" VARCHAR(95),
ADD COLUMN     "schemaData" TEXT,
ADD COLUMN     "schemaType" VARCHAR(50),
ADD COLUMN     "twitterDescription" VARCHAR(200),
ADD COLUMN     "twitterImage" VARCHAR(500),
ADD COLUMN     "twitterTitle" VARCHAR(70);
