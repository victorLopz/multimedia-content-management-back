import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.role;

    if (this.allowedRoles.includes(user[0])) {
      return true;
    } else {
      throw new ForbiddenException(
        'No tienes permisos para acceder a esta ruta.',
      );
    }
  }
}
