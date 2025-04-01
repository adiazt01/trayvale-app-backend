import { EnviorementsKeys } from "../enums/enviorements.enum";

export default () => ({
  [EnviorementsKeys.PORT]: parseInt(process.env[EnviorementsKeys.PORT], 10),
  // JWT
  [EnviorementsKeys.JWT_SECRET]: process.env[EnviorementsKeys.JWT_SECRET],
  [EnviorementsKeys.JWT_EXPIRATION_TIME]: process.env[EnviorementsKeys.JWT_EXPIRATION_TIME],
  // Database
  database: {
    [EnviorementsKeys.DATABASE_HOST]: process.env[EnviorementsKeys.DATABASE_HOST],
    [EnviorementsKeys.DATABASE_PORT]: parseInt(process.env[EnviorementsKeys.DATABASE_PORT], 10) || 5432,
    [EnviorementsKeys.DATABASE_USERNAME]: process.env[EnviorementsKeys.DATABASE_USERNAME],
    [EnviorementsKeys.DATABASE_PASSWORD]: process.env[EnviorementsKeys.DATABASE_PASSWORD],
    [EnviorementsKeys.DATABASE_NAME]: process.env[EnviorementsKeys.DATABASE_NAME],
  },
});