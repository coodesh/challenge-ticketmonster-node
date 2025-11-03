import { Movie } from '../models';

export const createMovie = async (movieData) => {
  const movie = await Movie.create(movieData);
  return movie;
};

export const getMovies = async () => {
  return await Movie.findAll();
};

export const updateMovie = async (movieData) => {
  const movie = await Movie.findByPk(movieData.id);
  if (!movie) throw new Error('Movie not found');
  await movie.update(movieData);
  return movie;
};

export const deleteMovie = async (movieId) => {
  const deleted = await Movie.destroy({ where: { id: movieId } });
  if (!deleted) throw new Error('Movie not found');
};
