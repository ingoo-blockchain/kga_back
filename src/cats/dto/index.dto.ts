import { IsString, IsInt, IsOptional } from 'class-validator'

export class CreateCatDto {
    @IsString()
    name!:string;

    @IsInt()
    age!: number;

    @IsOptional()
    @IsString()
    breed!: string | undefined;
}

export class UpdateCatDto {
    id:number;
    name:string;
    age: number;
    breed: string;
}

export class ListAllEntities{
    start:number
    end:number
}