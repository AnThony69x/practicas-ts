import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('presentaciones')
export class Presentacion {
    @PrimaryGeneratedColumn()
    id: number;
}