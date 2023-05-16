import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUser({ email });
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
    }
    async login(user: User) {
        const payload = { 
            email: user.email, 
            sub: user._id, 
            name: user.name,
            roles: user.roles,
            role: user.role,
            createdBy: user.createdBy
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
