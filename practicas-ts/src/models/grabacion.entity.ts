import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Usuario } from './externos/usuario.entity'; // Si decides incluirla local o como referencia
import { Presentacion } from './externos/presentacion.entity'; // Si decides incluirla como relación
import { Slide } from './externos/slide.entity'; // Si decides incluirla como relación
//import { NavegacionSlide } from './navegacion-slide.entity';
//import { FragmentoAudio } from './fragmento-audio.entity';
//import { HistorialPractica } from './historial-practica.entity';
//import { NotaSlide } from './nota-slide.entity';
import { NavegacionSlide } from './navegacion_slide.entity'; // Asegúrate de que la ruta sea correcta

@Entity('grabaciones')
export class Grabacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuario_id: number;

  @Column()
  presentacion_id: number;

  @Column()
  archivo_audio: string;

  @CreateDateColumn()
  fecha_grabacion: Date;


  @Column({ name: 'nombre_archivo', type: 'varchar', length: 255 })
  nombreArchivo: string;

  @OneToMany(() => NavegacionSlide, nav => nav.grabacion)
  navegaciones: NavegacionSlide[];


  // Relaciones desactivadas temporalmente
  // Se activan cuando todas las entidades estén listas

  
  //@OneToMany(() => NavegacionSlide, nav => nav.grabacion)
  //navegaciones: NavegacionSlide[];

  //@OneToMany(() => FragmentoAudio, frag => frag.grabacion)
  //fragmentos: FragmentoAudio[];

  //@OneToMany(() => NotaSlide, nota => nota.grabacion)
  //notas: NotaSlide[];

  //@OneToMany(() => HistorialPractica, hist => hist.grabacion)
  //historiales: HistorialPractica[];
}
