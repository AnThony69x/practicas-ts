import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notas_side')

export class NotaSlide {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    grabacion_id: number;

    @Column()
    slide_id: number;

    @Column({ type: 'text' })
    contenido: string;

    @Column({ nullable: true })
    timestamp: number; // Timestamp en milisegundos


}