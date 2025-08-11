import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends Error {
    constructor(message: string, public readonly status: HttpStatus = 400) {
        super(message);
        this.name = this.constructor.name;
    }

    public toHttpException(): HttpException {
        return new HttpException(this.message, this.status);
    }
}