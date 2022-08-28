// importar JsonWebToken para generar tokens
const jwt = require('jsonwebtoken');
//para limpiar la respuesta del moongose
exports.clearRes = (data) => {
    const {password, createdAt, updatedAt, __v, ...restData} = data;
    return restData
}
//Crear el JSON WEEB TOKEN
exports.createJWT = (user) => {
    return jwt.sign({
        userId:user._id,
        email:user.email,
        role:user.role,
    }, process.env.JWT_SECRET, {expiresIn:'24h' }).split('.');
    }