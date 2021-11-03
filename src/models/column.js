import { DataTypes, STRING, UUIDV4 } from 'sequelize';
import { db } from '../db/database';

const Column = db.define('column', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
        unique: true
    },
    title: {
        type: STRING,
        allowNull: false
    }
});


export default Column;