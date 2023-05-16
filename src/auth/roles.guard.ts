import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    console.log('requiredRoles', requiredRoles);
    const { user } = context.switchToHttp().getRequest();
    console.log('userRoles', user.role);
    const userRoles = [user.role];
    return requiredRoles.some(role => userRoles.includes(role));
  }
}
