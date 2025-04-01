import * as Joi from 'joi';
import { EnviorementsKeys } from '../enums/enviorements.enum';

export default Joi.object({
    [EnviorementsKeys.PORT] : Joi.number().required(),
    // Database
    [EnviorementsKeys.DATABASE_HOST]: Joi.string().required(),
    [EnviorementsKeys.DATABASE_PORT]: Joi.number().required(),
    [EnviorementsKeys.DATABASE_USERNAME]: Joi.string().required(),
    [EnviorementsKeys.DATABASE_PASSWORD]: Joi.string().required(),
    [EnviorementsKeys.DATABASE_NAME]: Joi.string().required(),
    // JWT
    [EnviorementsKeys.JWT_SECRET]: Joi.string().required(),
    [EnviorementsKeys.JWT_EXPIRATION_TIME]: Joi.string().required(),
})