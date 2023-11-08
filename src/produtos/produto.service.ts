/* eslint-disable prettier/prettier */
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntidy } from "./produto.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ListaUsuarioDTO } from "src/usuarios/DTO/listaUsuario.dto";
import { AtualizaProdutoDTO } from "./DTO/AtualizaProduto.dto";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntidy)
        private readonly produtoRepository: Repository<ProdutoEntidy>
    ){}

    async criaProduto(produtoEntidy:ProdutoEntidy){
        await this.produtoRepository.save(produtoEntidy)
    }

    async listaProduto(){
        const produtosSalvos = await this.produtoRepository.find({
            relations:{
                imagens: true,
                caracteristicas: true,
            }
        })
        const produtosListados = produtosSalvos.map(
            (produto) => new ListaUsuarioDTO(
                produto.id,
                produto.nome
            )
        )

        return produtosListados
    };

    async atualizaProduto(id:string, novoDadoProduto: AtualizaProdutoDTO){
        const produto = await this.produtoRepository.findOneBy({ id })
        Object.assign(produto, novoDadoProduto)
        await this.produtoRepository.save(produto)
    }

    async deletaProduto(id:string){
        await this.produtoRepository.delete(id)
    }
}