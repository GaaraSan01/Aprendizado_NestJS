/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';

@Entity({name: 'produto_imagens'})
export class ProdutoImagens {
    @Column({name: 'url', length:255, nullable:false})
    url: string;

    @Column({name: 'descricao', length:255, nullable:false})
    descricao: string;
}
