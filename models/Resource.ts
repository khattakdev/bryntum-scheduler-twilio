import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class ResourceModel extends Model {
  declare id: number;
  declare name: string;
  declare eventColor: string;
  declare readOnly: boolean;
}

const Resource = sequelize.define<ResourceModel>(
  "Resource",
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
    telNumber: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    tableName: "resources",
    timestamps: false,
  },
);

export default Resource;