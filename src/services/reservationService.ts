import { Reservation, Showtime } from '../models';

export const getUserReservations = async (userId) => {
  return await Reservation.findAll({ where: { userId } });
};

export const createReservation = async (reservationData) => {
  const reservation = await Reservation.create(reservationData);
  return reservation;
};

export const cancelReservation = async (reservationId) => {
  const deleted = await Reservation.destroy({ where: { id: reservationId } });
  if (!deleted) throw new Error('Reservation not found');
};

export const getAllReservations = async () => {
  return await Reservation.findAll();
};

export const getAvailableSeats = async (showtimeId) => {
  const showtime = await Showtime.findByPk(showtimeId);
  if (!showtime) throw new Error('Showtime not found');
  const reservations = await Reservation.findAll({ where: { showtimeId } });
  const booked = reservations
    .flatMap(r => r.seatNumbers.split(',').map(s => parseInt(s.trim(), 10)));
  const seats = Array.from({ length: showtime.availableSeats }, (_, i) => i + 1);
  return seats.filter(s => !booked.includes(s));
};
