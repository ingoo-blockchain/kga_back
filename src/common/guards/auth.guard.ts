import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { FastifyRequest } from 'fastify'

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const ctx = context.switchToHttp()
        const request = ctx.getRequest<FastifyRequest>()
        return this.validateRequest(request)
    }    

    private validateRequest(request:FastifyRequest){
        return true
    }
}