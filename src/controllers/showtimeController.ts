import * as showtimeService from "../services/showtimeService";

export const createShowtime = async (req, res) => {
  try {
    const showtime = await showtimeService.createShowtime(req.body);
    res.status(201).json(showtime);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getShowtimes = async (req, res) => {
  try {
    const showtimes = await showtimeService.getShowtimes(req.params.movieID);
    res.status(200).json(showtimes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateShowtime = async (req, res) => {
  try {
    const showtime = await showtimeService.updateShowtime(req.body);
    res.status(200).json(showtime);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteShowtime = async (req, res) => {
  try {
    await showtimeService.deleteShowtime(req.params.showtimeId);
    res.status(200).json({ message: "Showtime deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAvailableSeats = async (req, res) => {
  try {
    const seats = await showtimeService.getAvailableSeats(
      req.params.showtimeId
    );
    res.status(200).json({ available_seats: seats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
