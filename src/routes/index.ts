import { signUp, login, promoteToAdmin } from "../controllers/authController";
import {
  createMovie,
  getMovies,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController";
import {
  createShowtime,
  getShowtimes,
  updateShowtime,
  deleteShowtime,
  getAvailableSeats,
} from "../controllers/showtimeController";
import {
  getUserReservations,
  createReservation,
  cancelReservation,
  getAllReservations,
} from "../controllers/reservationController";
import authMiddleware from "../middleware/authMiddleware";
import adminMiddleware from "../middleware/adminMiddleware";
import { Application } from "express";

export default (app: Application): void => {
  // Public routes
  app.post("/api/signup", signUp);
  app.post("/api/login", login);
  app.get("/api/movies", getMovies);

  // Protected routes
  app.use("/api", authMiddleware);
  app.get("/api/user/reservations", getUserReservations);
  app.post("/api/reservations", createReservation);
  app.delete("/api/reservations/:reservationId", cancelReservation);
  app.get("/api/showtimes/:showtimeId/seats", getAvailableSeats);
  app.get("/api/movies/:movieID/showtimes", getShowtimes);

  // Admin routes
  app.use("/api/admin", authMiddleware, adminMiddleware);
  app.post("/api/admin/movies", createMovie);
  app.put("/api/admin/movies/:movieId", updateMovie);
  app.delete("/api/admin/movies/:movieId", deleteMovie);
  app.get("/api/admin/reservations", getAllReservations);
  app.post("/api/admin/users/:userId/promote", promoteToAdmin);
  app.post("/api/admin/showtimes", createShowtime);
  app.put("/api/admin/showtimes/:showtimeId", updateShowtime);
  app.delete("/api/admin/showtimes/:showtimeId", deleteShowtime);
};
