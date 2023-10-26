/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { 
    ArrayMinSize, 
    IsArray, 
    IsDateString, 
    IsNotEmpty, 
    IsNumber, 
    IsOptional, 
    IsString, 
    IsUUID, 
    IsUrl, 
    MaxLength, 
    Min, 
    ValidateNested,
} from "class-validator"

export class AtualizaProdutoDTO {

    @IsUUID(undefined, {message: "ID do usuário inválido!"})
    id: string;

    @IsString()
    @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
    @IsOptional()
    nome: string;
    
    @IsNumber({maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false})
    @Min(1, {
        message: "O valor precisa ser maior que 0!"
    })
    @IsOptional()
    valor: number;

    @IsNumber()
    @Min(0, {
        message: "Quantidade minima inválida!"
    })
    @IsOptional()
    quantidadeDisponivel: number;

    @IsString()
    @MaxLength(1000, {
        message:"A descrição pode ter no máximo 1000 caracteres!"
    })
    @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia '})
    @IsOptional()
    descricao: string;

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(3, {
        message: "Precisa ser no minimo 3 caracteristicas"
    })
    @Type(() => CaracteristicasProdutoDTO)
    @IsOptional()
    caracteristicas: CaracteristicasProdutoDTO[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ImagensProdutoDTO)
    @IsOptional()
    imagens: ImagensProdutoDTO[];

    @IsString()
    @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
    @IsOptional()
    categoria: string;

    @IsDateString(undefined,{ message: "Data inválida!" })
    @IsOptional()
    dataCriacao: Date;
    
    @IsDateString(undefined,{ message: "Data inválida!" })
    @IsOptional()
    dataAtualizacao: Date;
}

export class CaracteristicasProdutoDTO {
    @IsString()
    @IsNotEmpty({message: "O nome do produtos é obrigatório!"})
    nome: string;

    @IsString()
    @MaxLength(1000, {
        message:"A descrição pode ter no máximo 1000 caracteres!"
    })
    @IsNotEmpty({ message: 'Descrição da caracteristica não pode ser vazia '})
    descricao: string
}

export class ImagensProdutoDTO {
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
}