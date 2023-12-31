-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_picture_path" TEXT DEFAULT 'https://vakufdtmmftfxdwxhhzu.supabase.co/storage/v1/object/public/profile-images/public/default.jpg',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Film" (
    "id" TEXT NOT NULL,
    "tmdb_id" INTEGER NOT NULL,
    "average_rating" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "List" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "bookmark_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListSavedByUser" (
    "list_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "ListSavedByUser_pkey" PRIMARY KEY ("list_id","user_id")
);

-- CreateTable
CREATE TABLE "FilmsOnLists" (
    "list_id" TEXT NOT NULL,
    "film_id" TEXT NOT NULL,

    CONSTRAINT "FilmsOnLists_pkey" PRIMARY KEY ("list_id","film_id")
);

-- CreateTable
CREATE TABLE "FilmWatchStatus" (
    "user_id" TEXT NOT NULL,
    "film_id" TEXT NOT NULL,
    "to_watch" BOOLEAN NOT NULL DEFAULT false,
    "watched" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FilmWatchStatus_pkey" PRIMARY KEY ("user_id","film_id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "film_id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "review_description" TEXT,
    "watched_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Film_tmdb_id_key" ON "Film"("tmdb_id");

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListSavedByUser" ADD CONSTRAINT "ListSavedByUser_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListSavedByUser" ADD CONSTRAINT "ListSavedByUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilmsOnLists" ADD CONSTRAINT "FilmsOnLists_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilmsOnLists" ADD CONSTRAINT "FilmsOnLists_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilmWatchStatus" ADD CONSTRAINT "FilmWatchStatus_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilmWatchStatus" ADD CONSTRAINT "FilmWatchStatus_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

