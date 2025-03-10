import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Resource extends Model {
  declare id: number;
  declare name: string;
  declare eventColor: string;
  declare readOnly: boolean;
}

Resource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventColor: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    readOnly: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "resources",
    sequelize,
    timestamps: false,
  }
)

export default Resource;