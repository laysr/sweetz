import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import Confeitaria from './Confeitaria';

@Entity('logo')
export default class Logo {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @OneToOne(() => Confeitaria, confeitaria => confeitaria.logo)
    @JoinColumn({ name: 'confeitaria_id' })
    confeitaria: Confeitaria;
}