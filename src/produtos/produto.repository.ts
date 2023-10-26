/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProdutoEntidy } from './produto.entidy';


@Injectable()
export class ProdutoRepository {
  private produtoRepository: ProdutoEntidy[] = [];

  async salva(produto: ProdutoEntidy) {
    this.produtoRepository.push(produto);
    return produto
  }

  async listar() {
    return this.produtoRepository;
  }

  private produtoId (id: string) {
    const possivelProduto = this.produtoRepository.find(
      produto => produto.id_produto === id
    )
    if(!possivelProduto){
      throw new Error("Produto não encontrado")
    }
    return possivelProduto
  }

  async atualiza(id: string, dataProduto: Partial<ProdutoEntidy>){
    const dataNotUpgradeable = ["id_produto", "id_usuario"]
    const produto = this.produtoId(id)
    Object.entries(dataProduto).forEach(([key, value]) => {
      if(dataNotUpgradeable.includes(key)){
        return;
      }
      produto[key] = value
    })
    return produto
  }

  async remove(id: string){
    const produtoRemovido = this.produtoId(id)
    this.produtoRepository = this.produtoRepository.filter((produto) => {
      produto.id_produto !== id
    })
    return produtoRemovido
  }
}
