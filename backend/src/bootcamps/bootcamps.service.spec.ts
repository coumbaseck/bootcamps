import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bootcamp } from './entities/bootcamp.entity';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';

@Injectable()
export class BootcampsService {
  constructor(
    @InjectRepository(Bootcamp)
    private bootcampRepository: Repository<Bootcamp>,
  ) {}

  create(createBootcampDto: CreateBootcampDto) {
    const bootcamp = this.bootcampRepository.create(createBootcampDto);
    return this.bootcampRepository.save(bootcamp);
  }

  findAll() {
    return this.bootcampRepository.find();
  }
}
