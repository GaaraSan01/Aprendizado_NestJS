/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './DTO/listaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './DTO/usuariosAtualiza.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>
  ) {}

  async criaUsuario(usuarioEntity: UsuarioEntity){
    await this.usuarioRepository.save(usuarioEntity)
  }

  async listaUsuarios(){
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosListados = usuariosSalvos.map(
        (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome)
    )

    return usuariosListados
  }

  async atualizaUsuario(id: string, usuarioEntidy: AtualizaUsuarioDTO){
    await this.usuarioRepository.update(id, usuarioEntidy)
  }

  async deletaUsuario(id: string){
    await this.usuarioRepository.delete(id)
  }
  
  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });
    return checkEmail;
  }
}
