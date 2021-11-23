import { Sequelize } from 'sequelize';

export const db = new Sequelize('trelloClone', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});

// Connect to database
export const dbConnect = async () => {
    try {
        await db.sync({ force: true });
    
    } catch (error) {
        return error;
    }
}