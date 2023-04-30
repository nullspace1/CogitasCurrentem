import {Distancia,Persona,Duracion,Intervalo,Entrenamiento} from "../src/entrenamiento";

const distancia1 = new Distancia(5, 'Kilometro');
const distancia2 = new Distancia(2000, 'Metro');

const persona1 = new Persona("John", "Doe", 32);
const persona2 = new Persona("Jane", "Smith", 28);

const duracion1 = new Duracion(0, 30, 0);
const duracion2 = new Duracion(0, 35, 1);

const intervalo1 = new Intervalo(duracion1, distancia1);
const intervalo2 = new Intervalo(duracion2, distancia2);

const entrenamiento1 = new Entrenamiento(persona1, new Date('2023-05-01'), [intervalo1, intervalo2]);
const entrenamiento2 = new Entrenamiento(persona2, new Date('2023-05-02'), [intervalo2]);

describe('Calculo de Distancia Total',() => {test('calculoDistanciaTotal', () => expect(entrenamiento1.kilometrosTotales()).toBe(7))})
describe('Calculo de Distancia Total 2', () => {test('calculoDistanciaTotal', () => expect(entrenamiento2.kilometrosTotales()).toBe(2))})
describe('Calculo En Minutos', () => {
    test('calculoMinutos', () => expect(duracion1.enMinutos()).toBe(30));
    test('calculoMinutosConHora', () => expect(duracion2.enMinutos()).toBe(35 + 60))
})
describe('Calculo De Duracion De Entrenamiento', () => {test('calculoDuracionEntrenamiento', () => expect(entrenamiento1.calcularTiempoTotal().enMinutos()).toBe(425))})
