const config = (): any => {
    return {
        database : process.env.DATABASE,
        jwt_secret: process.env.JWT_SECRET_KEY,
    };
 };
 
 export { config };