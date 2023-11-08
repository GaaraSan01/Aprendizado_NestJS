/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { 
    ArrayMinSize, 
    IsArray, 
    IsDateString, 
    IsNotEmpty, 
    IsNumber, 
    IsString, 
    IsUrl, 
    MaxLength, 
    Min, 
    ValidateNested,
} from "class-validator"
import { ProdutoEntidy } from "../produto.entity";

export class CriaProdutoDTO {

    @IsString({message: "O id deve ser uma string"})
    @IsNotEmpty({message: "O id do usuário é obrigatório"})
    id: string;
    
    @IsString()
    @IsNotEmpty({message: "O nome do produtos é obrigatório!"})
    nome: string;
    
    @IsNumber({maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false})
    @Min(1, {
        message: "O valor precisa ser maior que 0!"
    })
    valor: number;

    @IsNumber()
    @Min(0, {
        message: "Quantidade minima inválida!"
    })
    quantidadeDisponivel: number;

    @IsString()
    @MaxLength(1000, {
        message:"A descrição pode ter no máximo 1000 caracteres!"
    })
    @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia '})
    descricao: string;

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(3, {
        message: "Precisa ser no minimo 3 caracteristicas"
    })
    @Type(() => CaracteristicasProdutoDTO)
    caracteristicas: CaracteristicasProdutoDTO[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ImagensProdutoDTO)
    imagens: ImagensProdutoDTO[];

    @IsString()
    @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
    categoria: string;

    @IsDateString(undefined,{ message: "Data inválida!" })
    dataCriacao: Date;
    
    @IsDateString(undefined,{ message: "Data inválida!" })
    dataAtualizacao: Date;
}

export class CaracteristicasProdutoDTO {

    id: string;

    @IsString()
    @IsNotEmpty({message: "O nome do produtos é obrigatório!"})
    nome: string;

    @IsString()
    @MaxLength(1000, {
        message:"A descrição pode ter no máximo 1000 caracteres!"
    })
    @IsNotEmpty({ message: 'Descrição da caracteristica não pode ser vazia '})
    descricao: string

    produto: ProdutoEntidy;
}

export class ImagensProdutoDTO {
    id: string;

    @IsUrl(undefined, {
        message: "Digite uma URL válida!"
    })
    url: string;

    @IsString()
    @MaxLength(1000, {
        message:"A descrição pode ter no máximo 1000 caracteres!"
    })
    @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia '})
    descricao: string

    produto: ProdutoEntidy;
}