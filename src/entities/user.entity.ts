import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 64 })
    name:string;

    @Column({ length: 60 })
    email:string;

    @Column({ length:64 })
    password:string;
}