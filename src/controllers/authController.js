import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/user';

export const register = async (req, res) => {
    
    const { firstName, lastName, email, password } = req.body;

    try {
        
        const emailExists = await User.findOne({
            where: {
                email: email
            }
        });

        if (emailExists) {
            throw new Error(`This email ${email} is already registered`);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            google: false,
            password: hashedPassword,
        });

        if (!newUser) {
            throw new Error('Something went wrong creating the new user');
        } 

        res.status(201).json({
            message: 'New user succesfully created',
            email: newUser.email,
            id: newUser.id
        });


    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        });
    }
}

export const login = async (req, res) => {
    const { email, password } =  req.body;

    try {
        const userExists = await User.findOne({
            where: {
                email: email
            }
        });

        if (!userExists) {
            throw new Error('Email provided does not exists');
        }

        const hashedPassword = userExists.password;
        const passwordDoesMatch = await bcrypt.compare(password, hashedPassword);

        if (!passwordDoesMatch) {
            throw new Error('Incorrect password');
        }

        res.status(200).json({
            userExists
        });  

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        });
    }

}