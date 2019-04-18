import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Contract } from './contract';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {

    constructor(public contract: Contract) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        if (!valid) {
            throw new HttpException({
                message: 'Ops, algo saiu errado',
                success: false,
                data: null,
                error: this.contract.errors
            },
                HttpStatus.BAD_REQUEST);
        }
        return next.handle().pipe(map(data => ({ data })));
    }
}