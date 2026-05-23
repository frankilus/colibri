-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "businessName" TEXT,
    "primaryCategory" TEXT NOT NULL,
    "subcategories" TEXT NOT NULL DEFAULT '[]',
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "languages" TEXT NOT NULL DEFAULT '[]',
    "yearsExperience" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,
    "credentials" TEXT,
    "websiteUrl" TEXT,
    "socialLinks" TEXT,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "internalNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "providerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "categorySlug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceRange" TEXT NOT NULL,
    "duration" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Service_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Service_categorySlug_fkey" FOREIGN KEY ("categorySlug") REFERENCES "Category" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "categorySlug" TEXT,
    "message" TEXT NOT NULL,
    "budget" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Lead_categorySlug_fkey" FOREIGN KEY ("categorySlug") REFERENCES "Category" ("slug") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
