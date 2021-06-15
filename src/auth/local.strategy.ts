import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    //other auth actions would happen here
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('here2');
    const user = await this.authService.validateUser('username', 'password');
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
