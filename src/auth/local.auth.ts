import { Strategy } from 'passport-local';
//import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // super();
    super({
        usernameField: 'email',
        passwordField: 'password',
        // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // ignoreExpiration: false,
        // secretOrKey: 'testtest',
        
    });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log(email);
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}