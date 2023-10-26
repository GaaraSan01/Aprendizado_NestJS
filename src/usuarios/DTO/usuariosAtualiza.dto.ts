/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength, IsEmail, IsOptional } from 'class-validator';
import { EmailEhUnico } from '../middleware/usuario.validator';

export class AtualizaUsuarioDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'O campo nome não pode ser vazio!' })
  nome: string;

  @IsOptional()
  @IsEmail(undefined, { message: 'O campo email não pode ser vazio!' })
  @EmailEhUnico({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @IsOptional()
  @MinLength(6, {
    message: 'O campo de senha deve ter no minimo 6 caracteres!',
  })
  senha: string;
}
