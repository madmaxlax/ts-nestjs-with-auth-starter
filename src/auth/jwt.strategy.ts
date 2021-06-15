import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {}
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    let token: string;
    try {
      console.log(request.headers);
      //remove the bearer word
      token = request.headers.authorization.split(' ').pop();
      if (!token) {
        return false;
      }
    } catch (e) {
      console.log('error getting token', e);
      return false;
    }
    return this.authService.validateToken(token);
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
