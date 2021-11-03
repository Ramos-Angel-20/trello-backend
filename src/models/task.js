import { DataTypes, STRING, UUIDV4 } from 'sequelize';
import { db } from '../db/database';

const Task = db.define('task', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
        unique: true
    },
    description: {
        type: STRING,
        allowNull: false
    }
});


export default Task;