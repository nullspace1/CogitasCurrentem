import { Atleta } from "../model/atleta";
import { Entrenamiento } from "../model/entrenamiento";
import { ID, Repository } from "./persistence";

class EntrenamientoRepository extends Repository<Entrenamiento> {
    protected toObject(data: any) {
        throw new Error("Method not implemented.");
    }
    protected toData(object: Entrenamiento) {
        throw new Error("Method not implemented.");
    }




   public async saveCarrera(object: Atleta, c: Entrenamiento): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async saveEntrenamiento(object: Atleta, c: Entrenamiento): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async saveTests(object: Atleta, c: any): Promise<void> {
        throw new Error("Method not implemented.");
    }



}


export {EntrenamientoRepository}
