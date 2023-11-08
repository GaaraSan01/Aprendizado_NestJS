/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProdutoEntidy } from './produto.entity';

@Entity({name: 'produto_imagens'})
export class ProdutoImagensEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({name: 'url', length:255, nullable:false})
    url: string;

    @Column({name: 'descricao', length:255, nullable:false})
    descricao: string;

    @ManyToOne(() => ProdutoEntidy, (produto) => produto.imagens,
        {orphanedRowAction: 'delete',onDelete: 'CASCADE', onUpdate: 'CASCADE'}
    )
    produto: ProdutoEntidy;
}
