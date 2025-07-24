import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BootcampsModule } from './bootcamps/bootcamps.module';
import { LeadsModule } from './leads/leads.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Charge les variables d'environnement depuis .env
    ConfigModule.forRoot({
      isGlobal: true, // Rendre accessible partout sans avoir à l'importer
    }),
    
    // Connexion à la base PostgreSQL avec TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10), // Convertit en nombre
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, // Charge automatiquement les entités
      synchronize: false, 
    }),
    BootcampsModule,
    LeadsModule,
    AuthModule,
  ],
})
export class AppModule {}
