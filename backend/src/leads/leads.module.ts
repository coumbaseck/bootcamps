import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { Lead } from './entities/lead.entity';
import { Bootcamp } from '../bootcamps/entities/bootcamp.entity'; // si besoin

@Module({
  imports: [
    TypeOrmModule.forFeature([Lead, Bootcamp]) // <= ici
  ],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
