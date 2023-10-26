/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common/decorators/modules';
import { ProdutoRepository } from './produto.repository';
import { ProdutoController } from './produto.controller';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoRepository],
})
export class ProdutosModule {}
