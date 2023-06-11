import React, { useLayoutEffect, useState } from 'react';
import "../css/CrearMacrociclo.css"
import { MacroCiclo } from '../../electron/model/macrociclos';
import { Periodo } from '../../electron/model/periodos';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DatabaseInterface, ExistingDatabase } from '../persistence/persistence';
import { Atleta } from '../../electron/model/atleta';

type Box = {
  id: number;
  selected: boolean;
  submitted: boolean;
  color?: string;
};

type AtletaBox = {atleta : Atleta, checked : boolean}


export const MacroCicloCrear = () => {
  let navigate = useNavigate();
  const [prevBoxes, setPrevBoxes] = useState<Box[][]>([]);
  const initialBoxes: Box[] = Array.from({ length: 52 }, (_, i) => ({ id: i + 1, selected: false, submitted: false }));
  const [boxes, setBoxes] = useState<Box[]>(initialBoxes);
  const [startBox, setStartBox] = useState<number | null>(null);
  const [endBox, setEndBox] = useState<number | null>(null);

  const [listPeriodos, setPeriodos] = useState([])
  const [nombreMacrociclo, setNombreMacrociclo] = useState('')
  const [nombrePeriodo, setNombrePeriodo] = useState('')
  const [anio, setAnio] = useState(new Date().getFullYear())

  const [atletas, setAtletas] = useState([] as AtletaBox[])
  const [selectedAtletas, setSelectedAtletas] = useState([] as AtletaBox[])

  const location = useLocation();
  const ids : string[] = location.state?.ids;

  const [menuOpen, setMenuOpen] = useState(false);


  useLayoutEffect(() => {
    const fetch = async () => {
      const atletas = await new DatabaseInterface(ExistingDatabase.atleta).getAll() as Atleta[]
      const items = atletas.map(a => ({atleta : a, checked : ids.findIndex(i => i === a.id) !== -1}))
      setAtletas(items)
      setSelectedAtletas(items.filter(a => a.checked))
    }
    fetch()
  },[])


  const handleCheckChange = (id : string,isChecked: boolean) => {
    const updatedItems = atletas.map(item => {
      if (item.atleta.id === id) {
        return { ...item, checked: isChecked };
      }
      return item;
    });
    setAtletas(updatedItems);

    // Update selectedItems
    if (isChecked) {
      setSelectedAtletas([...selectedAtletas, updatedItems.find(item => item.atleta.id === id)!]);
    } else {
      setSelectedAtletas(selectedAtletas.filter(item => item.atleta.id !== id));
    }
  }

  const selectBoxes = (start: number, end: number) => {
    const [lower, upper] = start <= end ? [start, end] : [end, start];
    setBoxes(
      boxes.map((box) =>
        box.id >= lower && box.id <= upper ? { ...box, selected: true } : { ...box, selected: false }
      )
    );
  }


  const handleBoxClick = (id: number) => {
    const clickedBox = boxes.find(box => box.id === id);

    if (clickedBox && clickedBox.submitted) {
      return;
    }

    if (startBox === null) {
      setStartBox(id);
      selectBoxes(id, id);
    } else if (endBox === null) {
      if (boxes.slice(Math.min(startBox, id), Math.max(startBox, id)).some(box => box.submitted)) {
        return;
      }
      setEndBox(id);
      selectBoxes(startBox, id);
    } else {
      handleClear();
      setStartBox(id);
      selectBoxes(id, id);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (startBox !== null && endBox !== null) {
      prevBoxes.push(boxes.map(box => ({ ...box, selected: false })))
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      const [lower, upper] = startBox <= endBox ? [startBox, endBox] : [endBox, startBox];
      setBoxes(
        boxes.map(box =>
          box.id >= lower && box.id <= upper ? { ...box, selected: false, submitted: true, color } : box
        )
      );

      setStartBox(null);
      setEndBox(null);
      setNombrePeriodo('');

      let p = new Periodo(startBox, endBox, nombrePeriodo)
      p.setId()
      p.setDateOfCreation()

      listPeriodos.push(p)
    }
  };

  const handleClear = () => {
    setBoxes(boxes.map(box => ({ ...box, selected: false })));
    setStartBox(null);
    setEndBox(null);
    setNombrePeriodo('');
  };

  const handleReset = () => {
    setBoxes(initialBoxes);
    setStartBox(null);
    setEndBox(null);
    setNombrePeriodo('');
    setPeriodos([])
  };

  const createMacrociclo = async (event) => {
    event.preventDefault()
    let macrociclo = new MacroCiclo(anio, nombreMacrociclo)
    macrociclo.setId()
    macrociclo.setDateOfCreation()
    listPeriodos.forEach(p => macrociclo.agregarPeriodo(p))

    selectedAtletas.forEach(atletaBox => {

        atletaBox.atleta.agregarMacroCiclo(macrociclo);
        new DatabaseInterface(ExistingDatabase.atleta).update(atletaBox.atleta)

    })

    return macrociclo.id
  }

  const handleUndo = () => {
    if (prevBoxes.length > 0) {
      setBoxes(prevBoxes.pop());
      listPeriodos.pop()
    }

  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }


  return (
    <div>
      <label>Año</label>
      <input type="number" minLength={4} value={anio} onChange={e => setAnio(Number.parseInt(e.target.value))}></input>

      <label>Nombre</label>
      <input value={nombreMacrociclo} onChange={e => setNombreMacrociclo(e.target.value)}></input>

      <h3>Atletas disponibles</h3>
      <button onClick={toggleMenu}>{menuOpen ? 'Close menu' : 'Open menu'}</button>
      {menuOpen && (
        <div>
          {atletas.map(item => (
            <div key={item.atleta.id}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) => handleCheckChange(item.atleta.id,e.target.checked)}
              />
              {item.atleta.getNombre()}
            </div>
          ))}
        </div>
          )}

      <Grid boxes={boxes} handleBoxClick={handleBoxClick}></Grid>



      {(startBox !== null || endBox !== null) && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label>
              Nombre:
              <input type="text" value={nombrePeriodo} onChange={e => setNombrePeriodo(e.target.value)} />
            </label>
            <input type="submit" value="Submit" disabled={startBox === null || endBox === null} onSubmit={handleSubmit} />
          </form>
          <button type="button" onClick={handleClear}>Limpiar</button>

          {startBox !== null && <div>Comienzo: {startBox}</div>}
          {endBox !== null && <div>Fin: {endBox}</div>}
        </div>
      )}

      <button type="button" onClick={(event) => {
        createMacrociclo(event).then(id => {
          navigate('/macrociclo/' + id);
        });
      }}>Crear Macrociclo</button>
      <button type="button" onClick={handleUndo} disabled={prevBoxes.length === 0}>Deshacer</button>
      <button type="button" onClick={handleReset}>Reiniciar</button>


      {listPeriodos.map((p: Periodo) => <ul>
        <li>Periodo: {p.getNombre()} </li>
        <li>Semana Comienzo : {p.getSemanaComienzo()} </li>
        <li>Semana Fin: {p.getSemanaFin()} </li>
      </ul>
      )}

<h3>Atletas Seleccionados</h3>
      <select>
        {selectedAtletas.map(item => (
          <option key={item.atleta.id}>
            {item.atleta.getNombre()}
          </option>
        ))}
      </select>

    </div>
  );
};



function Grid(props) {
  return (
    <div className="grid">
      {props.boxes.map(box => <div key={box.id} className={`box ${box.selected ? 'selected' : box.submitted ? 'submitted' : ''}`} style={box.submitted ? {
        backgroundColor: box.color
      } : {}} onClick={() => props.handleBoxClick(box.id)}>
        {box.id}
      </div>)}
    </div>);
}



