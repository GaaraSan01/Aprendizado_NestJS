import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuarios/usuario.module';
import { ProdutosModule } from './produtos/produto.module';

@Module({
  imports: [UsuarioModule, ProdutosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
