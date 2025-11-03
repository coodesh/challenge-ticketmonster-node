import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Reservation extends Model {
  public id!: string;
  public userId!: string;
  public showtimeId!: string;
  public seatNumbers!: string;
  public reservationTime!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Reservation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    showtimeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    seatNumbers: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reservationTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'Reservations',
  }
);
