import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Bootcamp } from '../../bootcamps/entities/bootcamp.entity';

@Entity()
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  message: string;

  

  @Column({ default: 'nouveau' })
  status: string;

  @ManyToOne(() => Bootcamp, bootcamp => bootcamp.leads, { onDelete: 'CASCADE' })
  bootcamp: Bootcamp;
}
