import jwt from 'jsonwebtoken';

const verifyJwt = (req, res, next) => {
    const token = req.header('bunny-token');

    if (!token) {
        res.status('401').json({
            message: 'Non-existent token on the request'
        });
    }

    try {

        const { uid: retrivedUid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = retrivedUid;
        next();

    } catch (error) {
        console.log(error);
        res.status('401').json({
            message: 'Invalid token'
        });
    }
}

export default verifyJwt;