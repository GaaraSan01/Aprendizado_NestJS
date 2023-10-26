/* eslint-disable prettier/prettier */
export class ProdutoEntidy {
    id_produto: string;
    id_usuario: string;
    nome: string;
    valor: number;
    descricao: string;
    quantidadeDisponivel: number;
    caracteristicas: CaracteristicaEndity[]
    imgens: ImagensEndity[]
    categoria: string;
}

export class CaracteristicaEndity {
    nome: string;
    descricao: string
}

export class ImagensEndity {
    url: string;
    descricao: string
}