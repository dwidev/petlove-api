import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { listValidatorProvider } from './utils/validator/validator.providers';
import { PetCategoryModule } from './pet-category/pet-category.module';
import { PetCategory } from './pet-category/entities/pet-category.entity';
import { UserDeliveryAddress } from './users/entities/user-delivery-address.entity';
import { MerchantModule } from './merchant/merchant.module';
import { Merchant } from './merchant/entities/merchant.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { Account } from './auth/entities/account.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Account,
        User,
        UserDeliveryAddress,
        PetCategory,
        Merchant,
        Product,
      ],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PetCategoryModule,
    MerchantModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...listValidatorProvider,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
