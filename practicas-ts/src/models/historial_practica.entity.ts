import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('historial_practicas')

export class HistorialPractica {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    grabacion_id: number;

    @Column()
    duracion_total: number; // Duración total de la grabación en segundos

    @Column()
    fecha_inicio: Date; // Fecha de creación del historial

    @Column()
    fecha_fin: Date; // Fecha de finalización de la práctica

    @Column()
    finalizado: boolean; // Indica si la práctica ha sido finalizada


}