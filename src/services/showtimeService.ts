import { Showtime } from '../models';

export const createShowtime = async (showtimeData) => {
  const showtime = await Showtime.create(showtimeData);
  return showtime;
};

export const getShowtimes = async (movieId) => {
  return await Showtime.findAll({ where: { movieId } });
};

export const updateShowtime = async (showtimeData) => {
  const showtime = await Showtime.findByPk(showtimeData.id);
  if (!showtime) throw new Error('Showtime not found');
  await showtime.update(showtimeData);
  return showtime;
};

export const deleteShowtime = async (showtimeId) => {
  const deleted = await Showtime.destroy({ where: { id: showtimeId } });
  if (!deleted) throw new Error('Showtime not found');
};

export const getAvailableSeats = async (showtimeId) => {
  const showtime = await Showtime.findByPk(showtimeId);
  if (!showtime) throw new Error('Showtime not found');
  // Fetch booked reservations
  const reservations = await showtime.getReservations();
  const booked = reservations
    .flatMap(r => r.seatNumbers.split(',').map(s => parseInt(s.trim(), 10)));
  const seats = Array.from({ length: showtime.availableSeats }, (_, i) => i + 1);
  return seats.filter(s => !booked.includes(s));
};
