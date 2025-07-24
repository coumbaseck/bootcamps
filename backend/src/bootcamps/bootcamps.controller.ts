import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { BootcampsService } from './bootcamps.service';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('bootcamps')
export class BootcampsController {
  constructor(private readonly bootcampsService: BootcampsService) {}

  // ✅ Public
  @Get()
  findAll() {
    return this.bootcampsService.findAll();
  }

  // ✅ Public
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bootcampsService.findOne(+id);
  }

  // 🔐 Admin only
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBootcampDto: CreateBootcampDto) {
    return this.bootcampsService.create(createBootcampDto);
  }

  // 🔐 Admin only
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBootcampDto: UpdateBootcampDto) {
    return this.bootcampsService.update(+id, updateBootcampDto);
  }

  // 🔐 Admin only
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bootcampsService.remove(+id);
  }
}