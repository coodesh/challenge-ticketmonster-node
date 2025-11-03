import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Movie extends Model {
  public id!: string;
  public title!: string;
  public director!: string;
  public releaseDate!: string;
  public duration!: number;
  public description!: string;
  public genre!: 'Action' | 'Comedy' | 'Drama' | 'Science Fiction';
  public posterImage!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Movie.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    director: { type: DataTypes.STRING, allowNull: false },
    releaseDate: { type: DataTypes.DATEONLY, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    genre: { type: DataTypes.ENUM('Action','Comedy','Drama','Science Fiction'), allowNull: false },
    posterImage: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: 'Movies',
  }
);
