import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/configurations/app.configuration';
import appConfigurationSchema from './config/schemas/app-configuration.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnviorementsKeys } from './config/enums/enviorements.enum';
import { UsersModule } from './users/users.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CommonModule } from './common/common.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: appConfigurationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(EnviorementsKeys.DATABASE_HOST),
        port: configService.get(EnviorementsKeys.DATABASE_PORT),
        username: configService.get(EnviorementsKeys.DATABASE_USERNAME),
        password: configService.get(EnviorementsKeys.DATABASE_PASSWORD),
        database: configService.get(EnviorementsKeys.DATABASE_NAME),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    CqrsModule.forRoot(),
    AuthModule,
    UsersModule,
    CommonModule
  ],
  controllers: [],
  providers: [
  ],
  exports: [
    ConfigModule,
    TypeOrmModule,
  ]
})
export class AppModule { }