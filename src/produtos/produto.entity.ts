/* eslint-disable prettier/prettier */
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn 
} from 'typeorm';

@Entity({name: 'produtos'})
export class ProdutoEntidy {
    @PrimaryGeneratedColumn('uuid')
    id_produto: string;

    @Column({name: 'usuario_id', length: 100, nullable:false})
    id_usuario: string;

    @Column({name: 'nome', length: 100, nullable:false})
    nome: string;

    @Column({name: 'valor', nullable:false})
    valor: number;

    @Column({name: 'nome', length: 255, nullable:false})
    descricao: string;

    @Column({name: 'quantidade', nullable:false})
    quantidadeDisponivel: number;

    // caracteristicas: CaracteristicaEndity[]
    // imgens: ImagensEndity[]

    @Column({name: 'nome', length: 100, nullable:false})
    categoria: string;

    @CreateDateColumn({name: 'created_at'})
    createdA: string;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;
  
    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: string;
}