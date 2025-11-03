import * as reservationService from "../services/reservationService";

export const getUserReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getUserReservations(
      req.userId
    );
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createReservation = async (req, res) => {
  try {
    const data = { ...req.body, userId: req.userId };
    const reservation = await reservationService.createReservation(data);
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const cancelReservation = async (req, res) => {
  try {
    await reservationService.cancelReservation(req.params.reservationId);
    res.status(200).json({ message: "Reservation cancelled successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAvailableSeats = async (req, res) => {
  try {
    const seats = await reservationService.getAvailableSeats(
      req.params.showtimeId
    );
    res.status(200).json(seats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllReservations = async (_req, res) => {
  try {
    const reservations = await reservationService.getAllReservations();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
