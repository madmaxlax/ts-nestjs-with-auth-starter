import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createRemoteJWKSet } from 'jose/jwks/remote';
import { jwtVerify } from 'jose/jwt/verify';

@Injectable()
export class AuthService {
  constructor() {}
  JWKS = createRemoteJWKSet(
    new URL(
      // process.env.AAD_JWKS || 'https://login.microsoftonline.com/common/discovery/keys'
      process.env.AAD_JWKS ||
        // 'https://devfmgidp.b2clogin.com/devfmgidp.onmicrosoft.com/discovery/v2.0/keys?p=b2c_1a_signup_signin'
        'https://sbxfmgidp.b2clogin.com/sbxfmgidp.onmicrosoft.com/discovery/v2.0/keys?p=B2C_1A_signup_signin'
    )
  );

  async validateToken(token: string, allowedRoles: string[]) {
    try {
      if (token) {
        // try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { protectedHeader, payload } = await jwtVerify(token, this.JWKS);
        if (
          // check for specific payload data here
          allowedRoles.length === 0 ||
          (allowedRoles.length && (payload as any)['custom-roles']?.some((role: string) => allowedRoles.includes(role)))
        ) {
          return true;
        } else {
          return false;
        }
        // } catch (error) {
        // console.log(error);
        // return false;
        // }
      }
      return false;
    } catch (e) {
      throw new HttpException('Token Validation Error: ' + e.message, HttpStatus.FORBIDDEN);
    }
  }
}
