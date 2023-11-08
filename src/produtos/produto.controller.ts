/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './DTO/produtos.dto';
import { ProdutoEntidy } from './produto.entity';
import { v4 as uuid } from 'uuid';
import { AtualizaProdutoDTO } from './DTO/AtualizaProduto.dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Get()
  async listarProdutos() {
    return this.produtoRepository.listar();
  }

  @Post()
  async criarProduto(@Body() data: CriaProdutoDTO) {
    const produto = new ProdutoEntidy()

    produto.id_produto = uuid()
    produto.id_usuario = data.id
    produto.nome = data.nome
    produto.valor = data.valor
    produto.descricao = data.descricao
    // produto.caracteristicas = data.caracteristicas
    // produto.imgens = data.imagens
    produto.categoria = data.categoria

    const produtoCadastro = await this.produtoRepository.salva(produto)
    return {
      produto: produtoCadastro,
      message: "Produto criado com sucesso!"
    }
  }

  @Put("/:id")
  async atualiza(@Param("id") id: string, @Body() data:AtualizaProdutoDTO){
    const produtoAlterado = await this.produtoRepository.atualiza(
      id,
      data
    )

    return{
      produto: produtoAlterado,
      message: "Produto alterado com sucesso!"
    }
  }

  @Delete("/:id")
  async remove(@Param("id") id:string) {
    const produtoRemovido = this.produtoRepository.remove(id)
    return {
      produto: produtoRemovido,
      message: "Produto removido com sucesso!"
    }
  }

}
