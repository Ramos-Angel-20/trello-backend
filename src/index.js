import express, { json } from 'express';

import { dbConnect } from './db/database';
import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes'

// Modelos
import User from './models/user';
import Project from './models/project';
import Column from './models/column';
import Task from './models/task';

const app = express();

// Middlewares
app.use(json());

// Rutas
app.use('/api/v1', authRoutes);
app.use('/api/v1', projectRoutes);

// Relaciones
Project.belongsTo(User);
Project.hasMany(Column);
Column.hasMany(Task);

dbConnect().then(() => {

    app.listen(4000, () => {

        console.log('Server on port 4000');

        //Setup para crear datos de prueba...

        // Creamos un usuario de prueba.
        User.create({ firstName: 'Angel', lastName: 'Ramos', email: 'Angel@mail.com', password: 'Gaducito' }).then(res => {

            // Creamos los projectos de prueba asociados a ese usuario.
            Project.create({ title: 'Creacion de trello', description: 'Hacer una app mamalona', userId: res.dataValues.id}).then(res => {


                //Creamos unas columnas asociadas a ese proyecto. 
                Column.create({title: 'To do', projectId: res.dataValues.id}).then(res => {


                    //Creamos los tasks asociados a la columna que a su vez esta asociada a un proyecto.
                    Task.create({description: 'Crear el frontend', columnId: res.dataValues.id});
                    Task.create({description: 'Crear el diseño', columnId: res.dataValues.id});
                    Task.create({description: 'Crear el backend', columnId: res.dataValues.id});
                    Task.create({description: 'Crear la base de datos', columnId: res.dataValues.id});
                });
                Column.create({title: 'In Progress', projectId: res.dataValues.id});
                Column.create({title: 'Finished', projectId: res.dataValues.id});



            });


            Project.create({title: 'Creacion de mi portafolio', description: 'Hacer un portafolio prron que me consiga chamba plox', userId: res.dataValues.id}).then(res => {
                
                
                //Creamos unas columnas asociadas a ese proyecto. 
                Column.create({title: 'To do', projectId: res.dataValues.id}).then(res => {


                    //Creamos los tasks asociados a la columna que a su vez esta asociada a un proyecto.
                    Task.create({description: 'Crear el frontend', columnId: res.dataValues.id});
                    Task.create({description: 'Crear el diseño', columnId: res.dataValues.id});
                    Task.create({description: 'Agregar mis proyectos', columnId: res.dataValues.id});
                    Task.create({description: 'Enlazar a Github', columnId: res.dataValues.id});
                });
                Column.create({title: 'In Progress', projectId: res.dataValues.id});
                Column.create({title: 'Finished', projectId: res.dataValues.id});


            });
        });



    });

}).catch(err => {
    console.log(err);
});