import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('slides')
export class Slide { 
    @PrimaryGeneratedColumn()
    id: number; 
}
