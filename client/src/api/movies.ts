import axios from "axios";

// TODO: create aliases for types. ie unogsdate: DateString
export type Movie = {
  id: string;
  title: string;
  image: string;
  synopsis: string;
  rating: string;
  type: "movie";
  released: string;
  runtime: string;
  largeimage: string;
  unogsdate: string;
  imdbid: string;
  download: string;
};

const baseUrl = "http://localhost:3000";

// Todo: add general network errors handling

export const getMovie = (id: string): Promise<Movie> =>
  axios.get(`${baseUrl}/movies/${id}`).then((data) => data.data);

export const getMovies = ({
  search,
  start,
  end,
}: {
  search?: string;
  start: number;
  end: number;
}): Promise<Movie[]> =>
  // Todo handle request not found (403)
  axios
    .get(`${baseUrl}/movies/?start=${start}&end=${end}&search=${search}`)
    .then((data) => data.data);
