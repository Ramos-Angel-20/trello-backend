import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/user';
import generateJwt from '../helpers/generateJwt';

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

        
        //Generate JWT
        const token = await generateJwt(newUser.id);

        res.status(200).json({
            email: newUser.email,
            token
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
        
        //Generate JWT
        const token = await generateJwt(userExists.id);

        res.status(200).json({
            email: userExists.email,
            profilePicUrl: userExists.profilePicUrl,
            token
        });  

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        });
    }
}