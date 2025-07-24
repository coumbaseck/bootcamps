import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { Bootcamp } from '../bootcamps/entities/bootcamp.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadsRepository: Repository<Lead>,

    @InjectRepository(Bootcamp)
    private bootcampRepository: Repository<Bootcamp>,
  ) {}

  // Créer un lead avec un ID numérique pour bootcampId
  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    const bootcamp = await this.bootcampRepository.findOne({
      where: { id: createLeadDto.bootcampId },  // BootcampId comme number
    });

    if (!bootcamp) {
      throw new NotFoundException('Bootcamp non trouvé');
    }

    const lead = this.leadsRepository.create({
      fullname: createLeadDto.fullname,
      email: createLeadDto.email,
      phone: createLeadDto.phone,
      message: createLeadDto.message,
      bootcamp,
    });

    return this.leadsRepository.save(lead);
  }

  // Trouver tous les leads avec les informations de bootcamp
  async findAll(): Promise<Lead[]> {
    return this.leadsRepository.find({
      relations: ['bootcamp'],  // Inclut les infos du bootcamp dans la réponse
    });
  }

  // Mise à jour du statut d'un lead avec un ID numérique
  async updateStatus(id: number, status: 'contacté' | 'inscrit'): Promise<Lead> {  // ID numérique ici
    const lead = await this.leadsRepository.findOne({ where: { id } });  // ID numérique ici
    if (!lead) throw new NotFoundException('Lead non trouvé');
    lead.status = status;
    return this.leadsRepository.save(lead);
  }
}
