import FilmPoster from "./FilmPoster";

interface Props {
  url: string;
}

interface Film {
  poster_path: string;
  title: string;
}

export default async function FilmList({ url }: Props) {
  async function fetchData() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    };
    const res = await fetch(url, options);
    const { results } = await res.json();

    return results;
  }

  const filmList = await fetchData();

  const renderFilm = (film: Film, index: number) => {
    return (
      <li key={index}>
        <FilmPoster
          src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
          alt={film.title}
        />
      </li>
    );
  };

  return (
    <ul className="flex flex-row gap-2 overflow-x-hidden py-6">
      {filmList
        .splice(0, 6)
        .map((film: Film, index: number) => renderFilm(film, index))}
    </ul>
  );
}