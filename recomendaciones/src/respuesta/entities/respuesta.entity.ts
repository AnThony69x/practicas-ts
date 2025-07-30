import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('respuestas')
export class Respuesta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  pregunta_original!: string;

  @Column()
  respuesta_generada_ia!: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_proceso!: Date;
}
