import { authSchema } from '../schema/auth.schema.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { success, data, error } = authSchema.loginSchema.safeParse(req.body);

    if (error) { 
        return res.status(400).json({ message: 'Invalid data', error: error.message });
    }

    try {
        const user = await User.findOne({ username: data.username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await user.comparePassword(data.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', user: user.toJSON(), token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const register = async (req, res) => {
    const { success, data, error } = authSchema.registerSchema.safeParse(req.body);

    if (error) {
        return res.status(400).json({ message: 'Invalid data', error: error.message });
    }
    try {
        const userExists = await User.findOne({ username: data.username });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }  

        const user = await User.create(data);
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ message: 'User created successfully', user: user.toJSON(), token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}