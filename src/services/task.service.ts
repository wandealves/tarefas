import { Injectable } from '@nestjs/common';

import { Task } from 'src/models/task.model';

@Injectable()
export class TaskService {

    getAll(): Task[] {
        const tasks: Task[] = [];
        tasks.push(new Task(1, 'Lavar roupa', false));
        tasks.push(new Task(2, 'Cortar o cabelo', false));
        tasks.push(new Task(3, 'Passear com o cachorro', true));

        return tasks;
    }

    get(): Task {
        return new Task(3, 'Passear com o cachorro', true);
    }

    create(model: Task): Task {
        model.code = new Date().getMilliseconds()
        return model;
    }

    update(code: string, model: Task): Task {
        return model;
    }

    remove(code: string) {
        console.log('deletado com sucesso!');
    }
}
