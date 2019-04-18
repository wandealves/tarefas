import { Controller, Get, Param, Body, Post, Put, Delete, HttpStatus, HttpException, UseInterceptors } from '@nestjs/common';

import { Task } from 'src/models/task.model';
import { TaskService } from 'src/services/task.service';
import { CreateTaskContract } from 'src/interceptors/create-task.contract';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

@Controller('v1/tasks')
export class TaskController {

    constructor(private readonly service: TaskService) { }

    @Get()
    getAll() {
        try {
            const tasks = this.service.getAll();
            return {
                message: 'tarefas obtidas com sucesso',
                success: true,
                error: null,
                data: tasks,
            };
        } catch (error) {
            throw new HttpException(
                {
                    message: 'erro na obtenção das tarefas',
                    success: false,
                    error,
                    data: null,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get(':code')
    get(@Param('code') code: string) {
        try {
            const task = this.service.get();
            return {
                message: 'tarefa obtida com sucesso',
                success: true,
                error: null,
                data: task,
            };
        } catch (error) {
            throw new HttpException(
                {
                    message: 'erro na obtenção da tarefa',
                    success: false,
                    error,
                    data: null,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateTaskContract()))
    post(@Body() model: Task) {
        try {
            const response = this.service.create(model);
            return {
                message: 'tarefa cadastrada com sucesso',
                success: true,
                error: null,
                data: response,
            };
        } catch (error) {
            throw new HttpException(
                {
                    message: 'erro ao cadastrar a tarefa',
                    success: false,
                    error,
                    data: null,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Put(':code')
    put(@Param('code') code, @Body() model: Task) {
        try {
            const response = this.service.update(code, model);
            return {
                message: 'tarefa atualizada com sucesso',
                success: true,
                error: null,
                data: response,
            };
        } catch (error) {
            throw new HttpException(
                {
                    message: 'erro ao atualkizar a tarefa',
                    success: false,
                    error,
                    data: null,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Delete(':code')
    delete(@Param('code') code) {
        try {
            this.service.remove(code);
            return {
                message: 'tarefa removida com sucesso',
                success: true,
                error: null,
                data: null,
            };
        } catch (error) {
            throw new HttpException(
                {
                    message: 'erro ao deletar a tarefa',
                    success: false,
                    error,
                    data: null,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
