import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest:ExtractJwt.fromExtractors([(request) => {
        let data = request?.cookies["auth-cookie"];
        console.log('data', data);
        if(!data){
            return null;
        }
        return data.token
    }]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET_KEY')
    });
  }

  async validate(payload: User) {
    return { 
      _id: payload.sub, 
      email: payload.email, 
      name: payload.name,
      roles: payload.roles,
      role: payload.role,
      createdBy: payload.createdBy
    };
  }
}