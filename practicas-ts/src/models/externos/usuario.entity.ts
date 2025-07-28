import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
}
