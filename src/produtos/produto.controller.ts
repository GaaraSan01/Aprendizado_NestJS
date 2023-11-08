/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import { CriaProdutoDTO } from './DTO/produtos.dto';
import { ProdutoEntidy } from './produto.entity';
import { v4 as uuid } from 'uuid';
import { AtualizaProdutoDTO } from './DTO/AtualizaProduto.dto';
import { ProdutoService } from './produto.service';

@Controller('/produtos')
export class ProdutoController {
  constructor(
    private readonly produtoService: ProdutoService
  ) {}

  @Get()
  async listarProdutos() {
    return this.produtoService.listaProduto();
  }

  @Post()
  async criarProduto(@Body() data: CriaProdutoDTO) {
    const produto = new ProdutoEntidy()

    produto.id = uuid()
    produto.usuarioId = data.id
    produto.nome = data.nome
    produto.valor = data.valor
    produto.descricao = data.descricao
    produto.quantidadeDisponivel = data.quantidadeDisponivel
    produto.caracteristicas = data.caracteristicas
    produto.imagens = data.imagens
    produto.categoria = data.categoria

    const produtoCadastro = await this.produtoService.criaProduto(produto)
    return {
      produto: produtoCadastro,
      message: "Produto criado com sucesso!"
    }
  }

  @Put("/:id")
  async atualiza(@Param("id") id: string, @Body() data:AtualizaProdutoDTO){
    const produtoAlterado = await this.produtoService.atualizaProduto(
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
    const produtoRemovido = this.produtoService.deletaProduto(id)
    return {
      produto: produtoRemovido,
      message: "Produto removido com sucesso!"
    }
  }

}
