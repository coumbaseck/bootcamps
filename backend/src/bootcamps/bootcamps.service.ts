import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bootcamp } from './entities/bootcamp.entity';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';

@Injectable()
export class BootcampsService {
  constructor(
    @InjectRepository(Bootcamp)
    private readonly bootcampRepository: Repository<Bootcamp>,
  ) {}

  create(createBootcampDto: CreateBootcampDto) {
    const newBootcamp = this.bootcampRepository.create(createBootcampDto);
    return this.bootcampRepository.save(newBootcamp);
  }

  findAll() {
    return this.bootcampRepository.find();
  }

  findOne(id: number) {
    return this.bootcampRepository.findOneBy({ id });
  }

  async update(id: number, updateBootcampDto: UpdateBootcampDto): Promise<Bootcamp> {
    const bootcamp = await this.bootcampRepository.findOneBy({ id });
  
    if (!bootcamp) {
      throw new Error(`Bootcamp avec l'ID ${id} non trouvé`);
    }
  
    const updated = Object.assign(bootcamp, updateBootcampDto);
    return this.bootcampRepository.save(updated);
  }
  
  
  async remove(id: number): Promise<void> {
    const result = await this.bootcampRepository.delete(id);
  
    if (result.affected === 0) {
      throw new NotFoundException(`Bootcamp avec l'id ${id} non trouvé`);
    }
  }
  
}
