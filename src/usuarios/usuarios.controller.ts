/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { UsuariosDTO } from "./DTO/usuarios.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./DTO/listaUsuario.dto";
import { AtualizaUsuarioDTO } from "./DTO/usuariosAtualiza.dto";
import { UsuarioService } from "./usuario.service";

@Controller('/usuarios')
export class UsuariosController {

    constructor(
        private usuarioRespository: UsuarioRepository,
        private usuarioService: UsuarioService
    ){}

    @Post()
    async criaUsuario (@Body() data: UsuariosDTO) {
        const usuarioEntidy = new UsuarioEntity()
        usuarioEntidy.email = data.email
        usuarioEntidy.nome = data.nome
        usuarioEntidy.senha = data.senha
        usuarioEntidy.id = uuid()

        this.usuarioService.criaUsuario(usuarioEntidy)
        return {
            usuario: new ListaUsuarioDTO(usuarioEntidy.id, usuarioEntidy.nome),
            message: "Usuário criado com sucesso!"
        }
    }

    @Get()
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioService.listaUsuarios()
        return usuariosSalvos;
    }

    @Put("/:id")
    async atualizaUsuario(@Param("id") id: string, @Body() newData: AtualizaUsuarioDTO ) {
        const usuarioAtualizado = await this.usuarioService.atualizaUsuario(id, newData)

        return{
            usuario: usuarioAtualizado,
            message: "Usuário atualizado com sucesso!"
        }
    }

    @Delete("/:id")
    async removeUsuario(@Param("id") id: string){
        const usuarioRemovido = await this.usuarioService.deletaUsuario(id)
        return {
            usuario: usuarioRemovido,
            messagem: "Usuário removido com sucesso!"
        }
    }
}