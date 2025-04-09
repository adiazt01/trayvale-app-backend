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
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { InvoicesModule } from './invoices/invoices.module';
import { PaymentsModule } from './payments/payments.module';
import { ReportsModule } from './reports/reports.module';
import { FilesModule } from './files/files.module';
import { CustomersModule } from './customers/customers.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Global()
@Module({
  imports: [
    EventEmitterModule.forRoot(),
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
    CommonModule,
    ProductsModule,
    SalesModule,
    CustomersModule,
    InvoicesModule,
    PaymentsModule,
    ReportsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
  exports: [ConfigModule, TypeOrmModule],
})
export class AppModule {}
