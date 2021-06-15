import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {}
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler()) || [];
    let token: string;
    try {
      //remove the bearer word
      token = request.headers.authorization.split(' ').pop();
      if (!token) {
        return false;
      }
    } catch (e) {
      console.log('error getting token', e);
      return false;
    }
    try {
      const response = this.authService.validateToken(token, roles);
      return response;
    } catch (e) {
      throw new HttpException('Auth Error: ' + e.message, HttpStatus.FORBIDDEN);
    }
  }
}

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKeyProvider: {
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: process.env.AAD_JWKS || 'https://login.microsoftonline.com/common/discovery/keys',
//       },
//     });
//   }
//   async authenticate(req: any, options: any) {
//     console.log(req.headers, options);
//     return true;
//   }
//   //by the time we reach here, we are already guaranteed the token is valid
//   async validate(payload: unknown) {
//     return payload;
//   }
// }
