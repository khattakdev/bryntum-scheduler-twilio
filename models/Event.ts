import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Event extends Model {
  declare id: number;
  declare name: string;
  declare readonly: boolean;
  declare timeZone: string;
  declare draggable: boolean;
  declare resizable: string;
  declare children: string;
  declare allDay: boolean;
  declare duration: number;
  declare durationUnit: string;
  declare startDate: Date;
  declare endDate: Date;
  declare exceptionDates: string;
  declare recurrenceRule: string;
  declare cls: string;
  declare eventColor: string;
  declare eventStyle: string;
  declare iconCls: string;
  declare style: string;
}

Event.init(
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
    readOnly: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    timeZone: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    draggable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    resizable: {
      type: DataTypes.STRING,
      defaultValue: true,
    },
    children: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    allDay: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    durationUnit: {
      type: DataTypes.STRING,
      defaultValue: "day",
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    endDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    exceptionDates: {
      type: DataTypes.JSON,
      defaultValue: null,
    },
    recurrenceRule: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    cls: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    eventColor: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    eventStyle: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    iconCls: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    style: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    tableName: 'events',
    sequelize,
  },
)

export default Event;