import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Grabacion } from './grabacion.entity';

@Entity('navegacion_slides')
export class NavegacionSlide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grabacion_id: number;

  @ManyToOne(() => Grabacion, (grabacion) => grabacion.navegaciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'grabacion_id' })
  grabacion: Grabacion;

  @Column()
  slide_id: number;

  @Column()
  timestamp: number;

  @Column({ nullable: true })
  tipo_navegacion: string; // 'siguiente', 'anterior', etc.
}
