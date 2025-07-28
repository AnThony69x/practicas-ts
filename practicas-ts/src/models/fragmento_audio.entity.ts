import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fragmentos_audio')

export class FragmentoAudio {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    grabacion_id: number; // ID de la grabación a la que pertenece el fragmento

    @Column()
    slide_id: number; // ID del slide al que pertenece el fragmento

    @Column()
    inicio_segundo: number; // Inicio del fragmento en segundos

    @Column()
    fin_segundo: number; // Fin del fragmento en segundos

    @Column({ nullable: true })
    archivo_fragmento: string; // Nombre del archivo de audio del fragmento

}