/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsuarioEntidy } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntidy[] = [];

  async salvar(usuario: UsuarioEntidy) {
    return this.usuarios.push(usuario);
  }

  async listar() {
    return this.usuarios;
  }

  async existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email,
    );

    return possivelUsuario !== undefined;
  }
  
  private buscaPorId(id: string){
    const possivelUsuarios = this.usuarios.find(
      usuarioSalvo => usuarioSalvo.id === id
    );

    if(!possivelUsuarios){
      throw new Error("Usuário não existe")
    }

    return possivelUsuarios
  }

  async atualiza(id: string, putData: Partial<UsuarioEntidy>){
    const usuario = this.buscaPorId(id)

    Object.entries(putData).forEach(([key, value]) => {
      if(key === id){
        return;
      }

      usuario[key] = value
    })

    return usuario;
  }

  async remove(id: string){
    const usuario = this.buscaPorId(id)

    this.usuarios = this.usuarios.filter(
      usuarioSalvo => usuarioSalvo.id !== id
    )

    return usuario
  }
}