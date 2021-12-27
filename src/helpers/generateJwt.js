import jwt from 'jsonwebtoken';

const generateJwt = uid => {
    
    return new Promise((resolve, reject) => {
        
        const payload = { uid };

        //FIXME: enviroment variables not working
        jwt.sign(payload, process.env.JWT_SECRET,  {
            expiresIn: '2h'
        }, (err, token) => {
            
            if (err) {
                console.log(err);
                reject(err.message);
            }

            resolve(token);
        });
        
    });
}

export default generateJwt;