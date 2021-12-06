import { DataTypes, STRING, UUIDV4, BOOLEAN } from 'sequelize';
import { db } from '../db/database';


const User = db.define('user', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
        unique: true
    },
    firstName: {
        type: STRING,
        allowNull: false
    },
    lastName: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: STRING,
        allowNull: false
    },
    google: {
        type: BOOLEAN,
        allowNull: false
    },
    profilePicUrl: {
        type: STRING,
        allowNull: true
    }
});

export default User;