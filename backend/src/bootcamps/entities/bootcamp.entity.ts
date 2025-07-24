import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';

import { Lead } from '../../leads/entities/lead.entity';

@Entity()
export class Bootcamp {
   
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  duration: string;

  @Column('decimal')
  price: number;

  @Column({ type: 'date' })
  nextSession: Date;

  @OneToMany(() => Lead, lead => lead.bootcamp)
  leads: Lead[];

}