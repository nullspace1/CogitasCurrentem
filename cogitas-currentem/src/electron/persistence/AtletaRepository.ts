import { Knex } from "knex";
import { Atleta, Sexo } from "../model/atleta";
import {  Repository } from "./persistence";
import { EntrenamientoRepository } from "./EntrenamientoRepository";
import { AnioRepository } from "./AnioRepository";
import { DefaultDateGenerator } from "../dates";


class AtletaRepository extends Repository<Atleta> {

    private entrenamientoRepository: EntrenamientoRepository
    private anioRepository: AnioRepository

    constructor(knex: Knex, entrenamientoRepository: EntrenamientoRepository,
        anioRepository: AnioRepository) {
        super(knex)
        this.entrenamientoRepository = entrenamientoRepository
        this.anioRepository = anioRepository;
        this.TABLE_NAME = 'Atleta'
    }

    public async save(object: Atleta): Promise<Atleta> {
        object.carreras.forEach(c => this.entrenamientoRepository.saveCarrera(object, c))
        object.entrenamientos.forEach(c => this.entrenamientoRepository.saveEntrenamiento(object, c))
        object.tests.forEach(t => this.entrenamientoRepository.saveTests(object, t))
        object.macroCiclos.forEach(m => this.anioRepository.saveAnio(object, m))
        return super.save(object)
    }

    public async delete(object : Atleta){
        super.delete(object)
    }


    toData(object: Atleta) {
        return {
            nombre: object.nombre,
            objetivos: object.objetivos,
            sexo: object.sexo.toString(),
            altura: object.altura,
            peso: object.peso,
            anioComienzoEntrenamiento: object.anioComienzoEntrenamiento,
            fechaNacimiento: object.fechaNacimiento
        }
    }

    toObject(data: any){
        const atleta = new Atleta(data.nombre, new Date(data.fechaNacimiento), data.peso, data.altura, Sexo[data.sexo], data.anioComienzoEntrenamiento, data.objetivos, new DefaultDateGenerator())
        atleta.id = data.id
        return atleta
    }









}

export { AtletaRepository }
