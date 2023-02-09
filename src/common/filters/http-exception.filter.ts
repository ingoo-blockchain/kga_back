import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { ServerResponse } from 'http'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<FastifyReply>()
        const request = ctx.getRequest()
        const statusCode = exception.getStatus()

        response.status(statusCode).send({
            statusCode,
            timestamp: new Date().toISOString(),
            path: request.url,
        })
    }
}