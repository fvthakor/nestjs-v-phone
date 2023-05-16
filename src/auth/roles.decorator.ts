import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/users/entities/role_enum';


export const Roles = (roles: Role[]) => SetMetadata('roles', roles);