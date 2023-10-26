/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { UsuariosDTO } from "./DTO/usuarios.dto";
import { UsuarioEntidy } from "./usuario.entidy";
import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./DTO/listaUsuario.dto";
import { AtualizaUsuarioDTO } from "./DTO/usuariosAtualiza.dto";

@Controller('/usuarios')
export class UsuariosController {

    constructor(private usuarioRespository: UsuarioRepository){}

    @Post()
    async criaUsuario (@Body() data: UsuariosDTO) {
        const usuarioEntidy = new UsuarioEntidy()
        usuarioEntidy.email = data.email
        usuarioEntidy.nome = data.nome
        usuarioEntidy.senha = data.senha
        usuarioEntidy.id = uuid()

        this.usuarioRespository.salvar(usuarioEntidy)
        return {
            usuario: new ListaUsuarioDTO(usuarioEntidy.id, usuarioEntidy.nome),
            message: "Usuário criado com sucesso!"
        }
    }

    @Get()
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRespository.listar()
        const usuariosLista = usuariosSalvos.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome
            )
        );
        return usuariosLista;
    }

    @Put("/:id")
    async atualizaUsuario(@Param("id") id: string, @Body() newData: AtualizaUsuarioDTO ) {
        const usuarioAtualizado = await this.usuarioRespository.atualiza(id, newData)

        return{
            usuario: usuarioAtualizado,
            message: "Usuário atualizado com sucesso!"
        }
    }

    @Delete("/:id")
    async removeUsuario(@Param("id") id: string){
        const usuarioRemovido = await this.usuarioRespository.remove(id)
        return {
            usuario: usuarioRemovido,
            messagem: "Usuário removido com sucesso!"
        }
    }
}