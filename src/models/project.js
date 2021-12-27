import { DataTypes, STRING, UUIDV4 } from 'sequelize';
import { db } from '../db/database';

const Project = db.define('project', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
        unique: true
    },
    title: {
        type: STRING,
        allowNull: false,
    },
    backgroundColor: {
        type: STRING,
        allowNull: true,
    },
    backgroundImageUrl: {
        type: STRING,
        allowNull: true,
    },
    slug: {
        type: STRING,
        allowNull: false
    }
});


export default Project;