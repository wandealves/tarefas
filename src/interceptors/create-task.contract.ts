
import { Task } from "src/models/task.model";
import { Contract } from "./contract";
import { Flunt } from "./flunt";

export class CreateTaskContract implements Contract {
    errors: any[];

    validate(model: Task): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.title, 2, 'Título inválido');

        this.errors = flunt.errors;

        return flunt.isValid();
    }
}
