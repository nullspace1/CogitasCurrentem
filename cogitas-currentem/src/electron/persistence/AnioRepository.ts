import { Anio } from "../model/anio";
import { Atleta } from "../model/atleta";
import { ID, Repository } from "./persistence";


class AnioRepository extends Repository<Anio>{
    protected toObject(data: any) {
        throw new Error("Method not implemented.");
    }
    protected toData(object: Anio) {
        throw new Error("Method not implemented.");
    }
    public save(object: Anio): Promise<Anio> {
        throw new Error("Method not implemented.");
    }
    public get(id: number): Promise<Anio> {
        throw new Error("Method not implemented.");
    }
    public getAll(): Promise<Anio[]> {
        throw new Error("Method not implemented.");
    }
    public delete(object: any): Promise<void> {
        throw new Error("Method not implemented.");
    }


    public async saveAnio(object: Atleta, m: Anio): Promise<void> {
        throw new Error("Method not implemented.");
    }


}


export {AnioRepository}
