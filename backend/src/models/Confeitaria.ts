import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import Logo from './Logo';

@Entity('confeitarias')
export default class Confeitaria {
    @PrimaryGeneratedColumn('increment')
    id: number;

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

    @OneToOne(() => Logo, logo => logo.confeitaria, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'confeitaria_id' })
    logo: Logo;
}