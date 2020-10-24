import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import Confeitaria from './Confeitaria';

@Entity('ingredientes')
export default class Ingrediente {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Confeitaria, confeitaria => confeitaria.ingredientes)
    @JoinColumn({ name: 'confeitaria'})
    confeitaria: Confeitaria;

    @Column()
    nome: string;

    @Column()
    quantidade: number;

    @Column()
    unidade: string;

    @Column()
    preco: number;
}