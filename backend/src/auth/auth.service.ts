import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(loginDto: { email: string; password: string }) {
    // Simule un admin (à remplacer plus tard par une vraie vérification avec la base de données)
    if (
      loginDto.email === 'admin@example.com' &&
      loginDto.password === 'admin123'
    ) {
      const payload = {
        sub: 1, // id
        email: loginDto.email,
        role: 'admin',
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException('Identifiants invalides');
  }
}
