-- CreateTable
CREATE TABLE "Session" (
    "key" TEXT NOT NULL,
    "session_data" JSONB NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("key")
);
