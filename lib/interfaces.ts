import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

export interface Film {
  id: number;
  title: string;
  backdrop_path: string;
  genres: [{ id: number; name: string }];
  overview: string;
  poster_path: string;
  tagline: string;
  release_date: string;
  runtime: string;
  credits: {
    cast: [{ name: string; character: string }];
    crew: [{ job: string; name: string; department: string }];
  };
  production_companies: [{ id: number; name: string }];
  production_countries: [{ name: string }];
}

export interface User {
  id: string;
  username: string;
  email: string;
  profile_picture_path: string | null;
  created_at: Date;
}

export interface WatchStatus {
  user_id: string;
  film_id: string;
  to_watch: boolean;
  watched: boolean;
  film: FilmOnDB;
}

export type Checked = DropdownMenuCheckboxItemProps["checked"];
export interface Genre {
  id: number;
  name: string;
  checked: Checked;
}

export interface Year {
  name: string;
  id: number;
  year_lte: string;
  year_gte: string;
  checked: boolean;
}

export interface FilmOnList {
  average_rating: string;
  id: string;
  tmdb_id: number;
}

export interface FilmsOnLists {
  list_id: string;
  film_id: string;
  film: FilmOnList;
}

export interface List {
  id: string;
  title: string;
  description: string;
  bookmark_count: number;
  films: FilmsOnLists[];
}

export interface Review {
  id: string;
  userId: string;
  filmId: string;
  rating: number;
  review_description: string;
  watched_at: Date;
  film: FilmOnDB;
}

export interface FilmOnDB {
  id: string;
  tmdb_id: number;
  average_rating: number;
}
