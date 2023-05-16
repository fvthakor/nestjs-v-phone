export default () => ({
    jwt_key: process.env.JWT_KEY || 'jwtKey',
    database: process.env.DATABASE || 'mongodb://localhost/nestCrud'
  });