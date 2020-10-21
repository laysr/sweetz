import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientes')
export default class Cliente {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
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