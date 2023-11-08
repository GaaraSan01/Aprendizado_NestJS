/* eslint-disable prettier/prettier */
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { ProdutoEntidy } from './produto.entity';


@Entity('produto_caracteristicas')
export class ProdutoCaracteristicaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'nome', length: 100, nullable: false})
    nome: string;

    @Column({name: 'descricao', length: 100, nullable: false})
    descricao: string;

    @ManyToOne(
        () => ProdutoEntidy, (produto) => produto.caracteristicas,
        {orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE'}
    )
    produto: ProdutoEntidy;
}
