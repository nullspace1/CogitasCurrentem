import { Exclude, Type } from "class-transformer"
import { Persistable } from "../../frontend/persistence/persistable"
import { DateGenerator, DefaultDateGenerator } from "../dates"
import { Pace, Peso, Sexo, Velocidad } from "../typeConfigs"
import { Entrenamiento } from "./entrenamiento"
import { MacroCiclo } from "./macrociclos"

class Atleta extends Persistable {

    private altura: number
    private aniosEntrenamiento: number

    @Type(() => Entrenamiento)
    private carreras: Entrenamiento[]

    @Type(() => Entrenamiento)
    private entrenamientos: Entrenamiento[]

    @Type(() => Date)
    private fechaNacimiento: Date

    @Type(() => MacroCiclo)
    private macroCiclos: MacroCiclo[]

    private nombre: string
    private objetivos: string
    private peso: Peso
    private sexo: Sexo

    @Type(() => Entrenamiento)
    private tests: Entrenamiento[]

    @Exclude()
    private dateGenerator: DateGenerator


    constructor(nombre: string, fechaNacimiento: Date, peso: Peso, altura: number,
        sexo: Sexo, aniosEntrenamiento: number, objetivos: string, dateGenerator?: DateGenerator) {
        super()
        this.nombre = nombre
        this.fechaNacimiento = fechaNacimiento
        this.altura = altura
        this.sexo = sexo
        this.tests = []
        this.carreras = []
        this.entrenamientos = []
        this.aniosEntrenamiento = aniosEntrenamiento
        this.macroCiclos = []
        this.peso = peso
        this.objetivos = objetivos
        this.dateGenerator = dateGenerator === undefined ? new DefaultDateGenerator() : dateGenerator
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

    public agregarMacroCiclo(macroCiclo: MacroCiclo) {
        this.macroCiclos.push(macroCiclo)
    }

    public agregarTest(test: Entrenamiento) {
        this.tests.push(test)
    }

    public agregarEntrenamiento(nuevoEntrenamiento: Entrenamiento) {
        this.entrenamientos.push(nuevoEntrenamiento)
    }

    private getAniosEntrenando() {
        const crDate: number = this.creationDate.valueOf()
        return new Date(this.dateGenerator.getHoy() - crDate).getFullYear() - 1970 + 1
    }

    public getAniosEntrenamiento() {
        return this.aniosEntrenamiento + this.getAniosEntrenando()
    }

    public getEdad() {
        return new Date(this.dateGenerator.getHoy() - this.fechaNacimiento.valueOf()).getFullYear() - 1970
    }

    public getAltura(): number {
        return this.altura
    }

    public getNombre(): string {
        return this.nombre
    }

    public getObjetivos(): string {
        return this.objetivos
    }

    public getPeso(): Peso {
        return this.peso
    }

    public getSexo(): Sexo {
        return this.sexo
    }

    public getEntrenamientos() {
        return this.entrenamientos
    }

    public getCarreras() {
        return this.carreras
    }

    public getTests() {
        return this.tests
    }

    public getMacroCiclos(){
        return this.macroCiclos
    }

    public getFechaNacimiento(){
        return this.fechaNacimiento
    }

}


export { Atleta, Sexo }
