import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import Ingrediente from './Ingrediente';

@Entity('confeitarias')
export default class Confeitaria {
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
    nome_negocio: string;

    @Column()
    cnpj: number;

    @Column()
    descricao: string;

    @Column()
    telefone: number;

    @Column()
    rua: string;

    @Column()
    numero: number;

    @Column()
    complemento: string;

    @Column()
    bairro: string;

    @Column()
    cidade: string;

    @Column()
    estado: string;

    @Column()
    logo_path: string;

    @OneToMany(type => Ingrediente, ingredientes => ingredientes.confeitaria, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'cod_confeitaria' })
    ingredientes: Ingrediente[];
}