import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Assignment extends Model {
  declare id: number;
  declare eventId: number;
  declare resourceId: number;
}

Assignment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "events",
        key: "id",
      },
      onDelete: "CASCADE", // Ensures that deleting an 'event' will delete related 'assignments'
    },
    resourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "resources",
        key: "id",
      },
      onDelete: "CASCADE", // This will delete all assignments referencing the resource when it's deleted
    },
  },
  {
    tableName: "assignments",
    sequelize,
    timestamps: false,
    indexes: [
      {
        fields: ["eventId"],
      },
      {
        fields: ["resourceId"],
      },
    ],
  }
)


export default Assignment;