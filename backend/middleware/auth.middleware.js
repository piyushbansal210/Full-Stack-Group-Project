import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    // console.log('AuthMiddleware');

    const authHeader = (req.headers.authorization);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.id, role: payload.role };
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}