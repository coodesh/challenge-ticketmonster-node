import bcrypt from 'bcrypt';
import sequelize from '../src/config/database';
import { User, Movie, Showtime, Reservation } from '../src/models';

async function seedDatabase() {
    try {
        console.log('🔄 Connecting to database...');
        await sequelize.authenticate();

        console.log('🔄 Synchronizing models...');
        await sequelize.sync({ force: true });

        console.log('👥 Creating users...');
        const users = await User.bulkCreate([
          {
            name: "Admin User",
            email: "admin@ticketmonster.com",
            password: await bcrypt.hash("admin123", 10),
            role: 0, // Admin
          },
          {
            name: "John Smith",
            email: "john@example.com",
            password: await bcrypt.hash("user123", 10),
            role: 1, // User
          },
          {
            name: "Jane Doe",
            email: "jane@example.com",
            password: await bcrypt.hash("user123", 10),
            role: 1, // User
          },
          {
            name: "Mike Johnson",
            email: "mike@example.com",
            password: await bcrypt.hash("user123", 10),
            role: 1, // User
          },
          {
            name: "Sarah Wilson",
            email: "sarah@example.com",
            password: await bcrypt.hash("user123", 10),
            role: 1, // User
          },
        ]);

        console.log('🎬 Creating movies...');
        const movies = await Movie.bulkCreate([
            {
                title: 'The Matrix Reloaded',
                director: 'Lana Wachowski',
                releaseDate: '2023-06-15',
                duration: 138,
                description: 'Neo and his allies race against time as the machines discover Zion and launch a massive assault.',
                genre: 'Action',
                posterImage: 'https://example.com/poster1.jpg',
            },
            {
                title: 'The Grand Budapest Hotel',
                director: 'Wes Anderson',
                releaseDate: '2023-07-20',
                duration: 99,
                description: 'The adventures of Gustave H, a legendary concierge at a famous European hotel between the wars.',
                genre: 'Comedy',
                posterImage: 'https://example.com/poster2.jpg',
            },
            {
                title: 'Interstellar',
                director: 'Christopher Nolan',
                releaseDate: '2023-08-10',
                duration: 169,
                description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
                genre: 'Science Fiction',
                posterImage: 'https://example.com/poster3.jpg',
            },
            {
                title: 'Parasite',
                director: 'Bong Joon-ho',
                releaseDate: '2023-09-05',
                duration: 132,
                description: 'A poor family schemes to become employed by a wealthy family by infiltrating their household.',
                genre: 'Drama',
                posterImage: 'https://example.com/poster4.jpg',
            },
            {
                title: 'Mad Max: Fury Road',
                director: 'George Miller',
                releaseDate: '2023-10-12',
                duration: 120,
                description: 'In a post-apocalyptic wasteland, Max teams up with a mysterious woman to escape a tyrannical warlord.',
                genre: 'Action',
                posterImage: 'https://example.com/poster5.jpg',
            },
            {
                title: 'Knives Out',
                director: 'Rian Johnson',
                releaseDate: '2023-11-01',
                duration: 130,
                description: 'A detective investigates the death of a patriarch of an eccentric, combative family.',
                genre: 'Comedy',
                posterImage: 'https://example.com/poster6.jpg',
            }
        ]);

        console.log('🎭 Creating showtimes...');
        const showtimes = [];
        const baseDate = new Date();

        // Create showtimes for the next 7 days
        for (let day = 0; day < 7; day++) {
            const currentDate = new Date(baseDate);
            currentDate.setDate(currentDate.getDate() + day);

            for (const movie of movies) {
                // 3 showtimes per movie per day
                const times = ['14:00', '17:30', '20:30'];

                for (const time of times) {
                    const [hours, minutes] = time.split(':');
                    const startTime = new Date(currentDate);
                    startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

                    const endTime = new Date(startTime);
                    endTime.setMinutes(endTime.getMinutes() + movie.duration);

                    showtimes.push({
                        movieId: movie.id,
                        startTime,
                        endTime,
                        availableSeats: Math.floor(Math.random() * 50) + 50, // 50-100 seats
                        price: parseFloat((15 + Math.random() * 20).toFixed(2)), // $15-35
                    });
                }
            }
        }

        const createdShowtimes = await Showtime.bulkCreate(showtimes);

        console.log('🎫 Creating sample reservations...');
        const reservations = [];

        // Create some reservations for demonstration
        for (let i = 0; i < 15; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomShowtime = createdShowtimes[Math.floor(Math.random() * createdShowtimes.length)];

            // Simulate reservation of 1-4 seats
            const numSeats = Math.floor(Math.random() * 4) + 1;
            const seatNumbers = [];
            for (let j = 0; j < numSeats; j++) {
                seatNumbers.push(`A${Math.floor(Math.random() * 20) + 1}`);
            }

            reservations.push({
                userId: randomUser.id,
                showtimeId: randomShowtime.id,
                seatNumbers: seatNumbers.join(','),
                reservationTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Last 7 days
            });
        }

        await Reservation.bulkCreate(reservations);

        console.log('\n✅ Migration completed successfully!');
        console.log('\n📊 Data created:');
        console.log(`   👥 ${users.length} users`);
        console.log(`   🎬 ${movies.length} movies`);
        console.log(`   🎭 ${createdShowtimes.length} showtimes`);
        console.log(`   🎫 ${reservations.length} reservations`);

        console.log('\n🔑 Access credentials:');
        console.log('   Admin: admin@ticketmonster.com / admin123');
        console.log('   User: john@example.com / user123');
        console.log('   User: jane@example.com / user123');
        console.log('   User: mike@example.com / user123');
        console.log('   User: sarah@example.com / user123');

    } catch (error) {
        console.error('❌ Error during migration:', error);
        process.exit(1);
    } finally {
        await sequelize.close();
        console.log('\n🔌 Database connection closed.');
        process.exit(0);
    }
}

// Execute the migration
if (require.main === module) {
    seedDatabase();
}

export default seedDatabase;