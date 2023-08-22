import prismaClient from "@/lib/prisma-client";
import { getOrAddFilmToDB } from "@/lib/functions";
import { NextRequest, NextResponse } from "next/server";

export async function updateToWatchStatus(filmId: string, userId: string) {
  try {
    const filmWatchStatus = await prismaClient.filmWatchStatus.findUnique({
      where: {
        user_id_film_id: {
          user_id: userId,
          film_id: filmId,
        },
      },
    });
    if (filmWatchStatus) {
      const data = await prismaClient.filmWatchStatus.update({
        where: {
          user_id_film_id: {
            user_id: userId,
            film_id: filmId,
          },
        },
        data: {
          to_watch: !filmWatchStatus.to_watch,
        },
      });
    } else {
      const data = await prismaClient.filmWatchStatus.create({
        data: {
          film_id: filmId,
          user_id: userId,
          to_watch: true,
        },
      });
    }
  } catch (e) {}
}
export async function updateWatchedStatus(filmId: string, userId: string) {
  try {
    const filmWatchStatus = await prismaClient.filmWatchStatus.findUnique({
      where: {
        user_id_film_id: {
          user_id: userId,
          film_id: filmId,
        },
      },
    });
    if (filmWatchStatus) {
      const data = await prismaClient.filmWatchStatus.update({
        where: {
          user_id_film_id: {
            user_id: userId,
            film_id: filmId,
          },
        },
        data: {
          watched: !filmWatchStatus.watched,
        },
      });
    } else {
      const data = await prismaClient.filmWatchStatus.create({
        data: {
          film_id: filmId,
          user_id: userId,
          watched: true,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
}

const getFilmInfoFromUser = async (userId: string, filmId: string) => {
  try {
    const data = await prismaClient.filmWatchStatus.findUnique({
      where: {
        user_id_film_id: {
          user_id: userId,
          film_id: filmId,
        },
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export async function POST(request: NextRequest) {
  const { apiId, userId, isWatched, toWatch } = await request.json();
  let statusToUpdate;
  console.log(isWatched, toWatch, apiId);
  try {
    if (apiId) {
      const filmId = await getOrAddFilmToDB(apiId);
      if (filmId) {
        console.log(filmId);
        if (isWatched !== undefined) {
          await updateWatchedStatus(filmId, userId);
        } else if (toWatch !== undefined) {
          statusToUpdate = "toWatch";
          await updateToWatchStatus(filmId, userId);
        }
      }
    }
    return NextResponse.json({ msg: "Successful", status: 200 });
  } catch (e) {
    return NextResponse.error();
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiId = Number(searchParams.get("apiId"));
  const userId = searchParams.get("userId");
  try {
    if (apiId && userId) {
      const filmId = await getOrAddFilmToDB(apiId);
      if (filmId) {
        const watchStatus = await getFilmInfoFromUser(userId, filmId);
        console.log(watchStatus);
        return NextResponse.json({ watchStatus }, { status: 200 });
      }
    }
  } catch (e) {
    return NextResponse.error();
  }
}