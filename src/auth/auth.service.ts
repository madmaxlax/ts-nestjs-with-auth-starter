import { Injectable } from '@nestjs/common';
import { createRemoteJWKSet } from 'jose/jwks/remote';
import { jwtVerify } from 'jose/jwt/verify';

@Injectable()
export class AuthService {
  constructor() {}
  JWKS = createRemoteJWKSet(new URL(process.env.AAD_JWKS || 'https://login.microsoftonline.com/common/discovery/keys'));

  async validateToken(token: string) {
    console.log(token);
    if (token) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { protectedHeader, payload } = await jwtVerify(token, this.JWKS);
        if (
          true // check for specific payload data here

          // authorizedRoles.length &&
          // (payload as any)['custom-roles']?.some((role) => authorizedRoles.includes(role))
        ) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    return false;
  }
}
