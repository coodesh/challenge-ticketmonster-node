import express from 'express';
import dotenv from 'dotenv';
import db from './config/database';
import routes from './routes';

dotenv.config();

const app = express();
app.use(express.json());

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('DB connection error:', err));

db.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('DB sync error:', err));

routes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
