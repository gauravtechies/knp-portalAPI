const jwt = require('jsonwebtoken');
const users = require('../../helpers/auth.utility');
const helpers = require('../../helpers');
const enums = require('../../enums/enums');
const userDesc = require('../../enums/responses.desc');

module.exports = (db, logger) => ({
    refreshToken:async (req, res, next) => {
       
        const token = req.headers.refreshtoken;
        try {
            // Verify JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user =await users.loginRefreshToken(decoded.id);
            if(user){
                //Send token if refreh token looks good

                var userData = {id:user.id,email:user.email,fullName:user.fullName,roleId:user.roleId,role:user['role.role']}
                const token = await users.tokenGeneration(userData);
                console.log(token);
                return res.send(helpers.sendJson(token));
            }else{
            //User not found
            const errorResp = helpers.createError(enums.params.null, userDesc.userNotFound, enums.errorTypes.unAuthorized);
            return res.status(enums.statusCodes.notFound).send(helpers.sendErrorJson(enums.statusCodes.notFound, [errorResp]));
            }
            
        } catch (e) {
            // Internal server error
            console.log(e);
            const errorResp = helpers.createError(enums.params.null, enums.errorTypes.unAuthorized, enums.errorTypes.unAuthorized);
            return res.status(enums.statusCodes.unAuthorized).send(helpers.sendErrorJson(enums.statusCodes.unAuthorized, [errorResp]));
        }
    }
});
