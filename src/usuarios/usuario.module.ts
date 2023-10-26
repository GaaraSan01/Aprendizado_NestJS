/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UsuariosController } from "./usuarios.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailEhUnicoValidator } from "./middleware/usuario.validator";

@Module({
    controllers:[UsuariosController],
    providers: [UsuarioRepository, EmailEhUnicoValidator]
})
export class UsuarioModule {}