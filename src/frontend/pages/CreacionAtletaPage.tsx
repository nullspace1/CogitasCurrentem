import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Atleta, Sexo } from '../../backend/model/atleta';
import { SchemaNames, persist } from '../../backend/persistence/db';

interface FormData {
  nombre: string;
  fechaNacimiento: string;
  pesoEnKilos: number;
  alturaEnCm: number,
  sexo: Sexo,
  objetivos: string,
  aniosEntrenamiento: number
}

function createAtleta(data : FormData){
 var atleta = new Atleta(data.nombre,new Date(data.fechaNacimiento),data.pesoEnKilos,data.alturaEnCm,data.sexo,data.aniosEntrenamiento,data.objetivos)
 persist(SchemaNames.atletas,atleta)
}

export const CreacionAtletaPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    fechaNacimiento: '',
    pesoEnKilos: 0,
    alturaEnCm: 0,
    sexo: Sexo.Hombre,
    objetivos: '',
    aniosEntrenamiento: 0
  });

  const handleChange = <T extends HTMLInputElement | HTMLSelectElement>(
    e: ChangeEvent<T>
  ) => {
    const { name,value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'numberField' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
   createAtleta(formData)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </label>
      <br/>
      <label>
        Fecha de Nacimiento:
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Peso en kilos:
        <input
          type="number"
          name="pesoEnKilos"
          value={formData.pesoEnKilos}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Altura en CM:
        <input
            type="number"
            name="alturaEnCm"
            value={formData.alturaEnCm}
            onChange={handleChange}
        />
      </label>
      <br />
      <label>
      Sexo:
         <select name="sexo" value={formData.sexo} onChange={handleChange}>
           {Object.values(Sexo).map(sexo => (
             <option key={sexo} value={sexo}>
               {sexo}
             </option>
           ))}
            </select>
      </label>
      <br/>
      <label>
      Años de Entrenamiento:
      <input
            type="number"
            name="aniosEntrenamiento"
            value={formData.aniosEntrenamiento}
            onChange={handleChange}
        />
      </label>
      <br/>
      <button type="submit">Submit</button>
    </form>
  );
};
