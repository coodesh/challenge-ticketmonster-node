import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Showtime extends Model {
  public id!: string;
  public movieId!: string;
  public startTime!: Date;
  public endTime!: Date;
  public availableSeats!: number;
  public price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Showtime.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    movieId: { type: DataTypes.UUID, allowNull: false },
    startTime: { type: DataTypes.DATE, allowNull: false },
    endTime: { type: DataTypes.DATE, allowNull: false },
    availableSeats: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    tableName: 'Showtimes',
  }
);
