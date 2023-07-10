import { plainToInstance } from "class-transformer";
import { Atleta } from "../electron/model/atleta";

declare global {
    interface Window {
      electron: {
        saveAtleta : (atleta : Atleta) => Promise<any>
        getAllAtletas : () => Promise<Atleta[]>
        deleteAtleta : (atleta : Atleta) => Promise<void>
        getAtleta : (id : number) => Promise<Atleta>
      };
}
}

class DatabaseConnection {

    public async saveAtleta(atleta : Atleta) : Promise<Atleta>{
        const at = await window.electron.saveAtleta(atleta)
        return at
    }

    public async getAllAtletas() : Promise<Atleta[]> {
        const list = await window.electron.getAllAtletas()
        list.forEach(a => plainToInstance(Atleta,a))
        return list
    }

    public async deleteAtleta(atleta : Atleta) : Promise<void> {
        return await window.electron.deleteAtleta(atleta)
    }

    public async getAtleta(id : number) : Promise<Atleta> {
        const atleta = await window.electron.getAtleta(id);
        console.log(atleta)
        return plainToInstance(Atleta,atleta)
    }

}

export {DatabaseConnection}
