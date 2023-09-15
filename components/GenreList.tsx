"use client";

interface Props {
  genres: [{ id: number; name: string }];
}

export default function GenreList({ genres }: Props) {
  return (
    <div className="mb-5">
      <ul className="flex flex-wrap">
        {genres.map((genre) => {
          return (
            <li key={genre.id}>
              <div className="bg-beeBrownLightText text-beeBeig rounded-md text-center w-fit m-1 p-1">
                {genre.name}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}