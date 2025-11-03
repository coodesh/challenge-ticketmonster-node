import * as movieService from "../services/movieService";

export const createMovie = async (req, res) => {
  try {
    const data = { ...req.body, releaseDate: new Date(req.body.releaseDate) };
    const movie = await movieService.createMovie(data);
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMovies = async (_req, res) => {
  try {
    const movies = await movieService.getMovies();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await movieService.updateMovie(req.body);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    await movieService.deleteMovie(req.params.movieId);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
