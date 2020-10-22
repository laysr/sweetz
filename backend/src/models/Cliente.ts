import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity('clientes')
export default class Cliente {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    senha: string;

    @Column()
    nome: string;

    @Column()
    cpf: number;

    @Column()
    telefone: number;

    @Column()
    rua: string;

    @Column()
    numero: number;

    @Column()
    complemento: string;

    @Column()
    referencia: string;

    @Column()
    bairro: string;

    @Column()
    cidade: string;

    @Column()
    estado: string;
}