import { User } from './User';
import { Movie } from './Movie';
import { Showtime } from './Showtime';
import { Reservation } from './Reservation';

Movie.hasMany(Showtime, { foreignKey: 'movieId' });
Showtime.belongsTo(Movie, { foreignKey: 'movieId' });

User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Showtime.hasMany(Reservation, { foreignKey: 'showtimeId' });
Reservation.belongsTo(Showtime, { foreignKey: 'showtimeId' });

export { User, Movie, Showtime, Reservation };
