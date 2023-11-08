/* eslint-disable prettier/prettier */
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn, 
    OneToMany
} from 'typeorm';
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';
import { ProdutoImagensEntity } from './produto-imagens.entity';

@Entity({name: 'produtos'})
export class ProdutoEntidy {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'usuario_id', length: 100, nullable: false })
    usuarioId: string;

    @Column({name: 'nome', length: 100, nullable:false})
    nome: string;

    @Column({name: 'valor', nullable:false})
    valor: number;

    @Column({name: 'descricao', length: 255, nullable:false})
    descricao: string;

    @Column({name: 'quantidade', nullable:false})
    quantidadeDisponivel: number;

    @OneToMany(() => ProdutoCaracteristicaEntity,
     (produtoCaracteristicaEndity) => produtoCaracteristicaEndity.produto,
     { cascade: true, eager: true }
    )
    caracteristicas: ProdutoCaracteristicaEntity[]

    @OneToMany(() => ProdutoImagensEntity, 
        (imagens) => imagens.produto,
        { cascade: true, eager: true }
    )
    imagens: ProdutoImagensEntity[]

    @Column({name: 'categoria', length: 100, nullable:false})
    categoria: string;

    @CreateDateColumn({name: 'created_at'})
    createdA: string;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;
  
    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: string;
}