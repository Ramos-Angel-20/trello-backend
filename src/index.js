import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//TODO: REMOVER
import slugify from 'slugify';

import { dbConnect } from './db/database';

import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes';
import taskRoutes from './routes/task.routes';
import columnRoutes from './routes/column.routes';

// Modelos
import User from './models/user';
import Project from './models/project';
import Column from './models/column';
import Task from './models/task';

const app = express();

// Middlewares
app.use(json());
app.use(cors());
dotenv.config();

// Rutas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', projectRoutes);
app.use('/api/v1', taskRoutes);
app.use('/api/v1/', columnRoutes);

// Relaciones
Project.belongsTo(User);
Project.hasMany(Column);
Column.hasMany(Task);

dbConnect().then(() => {

    app.listen(4000, () => {

        //Setup para crear datos de prueba...

        // Creamos un usuario de prueba.
        User.create({ firstName: 'Angel', lastName: 'Ramos', email: 'Angel@mail.com', password: 'Gaducito', google: false }).then(res => {

            // Creamos los projectos de prueba asociados a ese usuario.

            const slug1 = slugify('Creacion de trello', {
                trim: true,
                lower: true
            });

            Project.create({
                title: 'Creacion de trello',
                userId: res.dataValues.id,
                slug: slug1
            }).then(res => {


                //Creamos unas columnas asociadas a ese proyecto. 
                Column.create({ title: 'To do', projectId: res.dataValues.id }).then(res => {


                    //Creamos los tasks asociados a la columna que a su vez esta asociada a un proyecto.
                    Task.create({ description: 'Crear el frontend', columnId: res.dataValues.id });
                    Task.create({ description: 'Crear el diseño', columnId: res.dataValues.id });
                    Task.create({ description: 'Crear el backend', columnId: res.dataValues.id });
                    Task.create({ description: 'Crear la base de datos', columnId: res.dataValues.id });
                });
                Column.create({ title: 'In Progress', projectId: res.dataValues.id });
                Column.create({ title: 'Finished', projectId: res.dataValues.id });



            }).catch(err => {
                console.log(err);
            });

            const slug2 = slugify('Creacion de mi portafolio', {
                trim: true,
                lower: true
            });

            Project.create({
                title: 'Creacion de mi portafolio',
                userId: res.dataValues.id,
                slug: slug2
            }).then(res => {


                //Creamos unas columnas asociadas a ese proyecto. 
                Column.create({ title: 'To do', projectId: res.dataValues.id }).then(res => {


                    //Creamos los tasks asociados a la columna que a su vez esta asociada a un proyecto.
                    Task.create({ description: 'Crear el frontend', columnId: res.dataValues.id });
                    Task.create({ description: 'Crear el diseño', columnId: res.dataValues.id });
                    Task.create({ description: 'Agregar mis proyectos', columnId: res.dataValues.id });
                    Task.create({ description: 'Enlazar a Github', columnId: res.dataValues.id });
                });
                Column.create({ title: 'In Progress', projectId: res.dataValues.id }).then(res => {
                    //Creamos los tasks asociados a la columna que a su vez esta asociada a un proyecto.
                    Task.create({ description: 'Hacer un diseño bonito', columnId: res.dataValues.id });
                    Task.create({ description: 'Investigar temas de UI', columnId: res.dataValues.id });
                });
                Column.create({ title: 'Finished', projectId: res.dataValues.id });


            }).catch(err => {
                console.log(err);
            });

            const slug3 = slugify('Hacer la automatacion', {
                trim: true,
                lower: true
            });

            Project.create({
                title: 'Hacer la automatacion',
                userId: res.dataValues.id,
                slug: slug3
            }).catch(err => {
                console.log(err);
            });

            const slug4 = slugify('Descubrir porque estoy solo en esta vida', {
                trim: true,
                lower: true
            });

            Project.create({
                title: 'Descubrir porque estoy solo en esta vida',
                userId: res.dataValues.id,
                slug: slug4
            }).catch(err => {
                console.log(err);
            });

            const slug5 = slugify('Ser yo mismo', {
                trim: true,
                lower: true
            });

            Project.create({
                title: 'Ser yo mismo',
                userId: res.dataValues.id,
                slug: slug5 
            }).catch(err => {
                console.log(err);
            });
        });

        console.log('Server on port 4000');

    });

}).catch(err => {
    console.log(err);
});