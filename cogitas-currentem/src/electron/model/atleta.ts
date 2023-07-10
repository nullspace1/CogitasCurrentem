import { Type } from "class-transformer"
import { DateGenerator, DefaultDateGenerator } from "../dates"
import { Pace, Peso, Sexo, Velocidad } from "../typeConfigs"
import { Entrenamiento } from "./entrenamiento"
import { Anio } from "./anio"
import { Persistable } from "../persistence/persistence"


class Atleta extends Persistable {

    nombre: string
    objetivos: string
    peso: Peso
    sexo: Sexo
    altura: number
    anioComienzoEntrenamiento: number


    @Type(() => Date)
    fechaNacimiento: Date


    @Type(() => Entrenamiento)
    carreras: Entrenamiento[]


    @Type(() => Entrenamiento)
    entrenamientos: Entrenamiento[]

    @Type(() => Entrenamiento)
    tests: Entrenamiento[]


    @Type(() =>Anio)
    macroCiclos: Anio[]

    @Type(() => DefaultDateGenerator)
    dateGenerator : DefaultDateGenerator



    constructor(nombre: string, fechaNacimiento: Date, peso: Peso, altura: number,
        sexo: Sexo, anioComienzoEntrenamiento: number, objetivos: string, dateGenerator? : DefaultDateGenerator) {
        super()
        this.nombre = nombre
        this.fechaNacimiento = fechaNacimiento
        this.altura = altura
        this.sexo = sexo
        this.anioComienzoEntrenamiento = anioComienzoEntrenamiento
        this.peso = peso
        this.objetivos = objetivos
        this.dateGenerator = dateGenerator
        this.carreras = []
        this.entrenamientos = []
        this.tests = []
        this.macroCiclos = []
    }


    private getAllEntrenamientos(): Entrenamiento[] {
        let allEntrenamientos: Entrenamiento[] = []
        allEntrenamientos.push(...this.carreras)
        allEntrenamientos.push(...this.tests)
        allEntrenamientos.push(...this.entrenamientos)
        return allEntrenamientos
    }

    public getRitmoMaximo(): Pace {
        let entrenamientos = this.getAllEntrenamientos()
        return entrenamientos.length === 0 ? 0 : entrenamientos.sort((x: Entrenamiento, y: Entrenamiento) => x.getPaceMaximo() - y.getPaceMaximo())[0].getPaceMaximo()
    }

    public getVelocidadMaxima(): Velocidad {
        return this.getRitmoMaximo() === 0 ? 0 : 1 / this.getRitmoMaximo()
    }

    public getRitmoAl(porcentage: number): Pace {
        return (1 / (1 / this.getRitmoMaximo() * porcentage))
    }

    public getDistanciaSemanal(): Pace {
        return this.getAllEntrenamientos().filter(e => this.dateGenerator.getSemana() === e.getSemana()).map(x => x.getDistancia()).reduce((x, y) => x + y, 0)
    }


    public agregarCarrera(carrera: Entrenamiento) {
        this.carreras.push(carrera)
    }

    public agregarMacroCiclo(macroCiclo: Anio) {
        this.macroCiclos.push(macroCiclo)
    }

    public agregarTest(test: Entrenamiento) {
        this.tests.push(test)
    }

    public agregarEntrenamiento(nuevoEntrenamiento: Entrenamiento) {
        this.entrenamientos.push(nuevoEntrenamiento)
    }

    public getAniosEntrenando() {
       return this.dateGenerator.getAnioActual() - this.anioComienzoEntrenamiento
    }

    public getEdad(){
        return this.dateGenerator.getAnioActual() - this.fechaNacimiento.getFullYear()
    }


}


export { Atleta, Sexo }
