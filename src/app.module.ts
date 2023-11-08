/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuarios/usuario.module';
import { ProdutosModule } from './produtos/produto.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresConfigSevice } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsuarioModule, 
    ProdutosModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigSevice,
      inject: [PostgresConfigSevice]
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
