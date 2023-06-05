import React, { useState } from 'react';
import "../css/CrearMacrociclo.css"

type Box = {
    id: number;
    selected: boolean;
    submitted: boolean;
    color?: string;
  };

export const MacroCicloCrear =  () => {
    const initialBoxes: Box[] = Array.from({ length: 52 }, (_, i) => ({ id: i + 1, selected: false, submitted: false }));
    const [boxes, setBoxes] = useState<Box[]>(initialBoxes);
    const [startBox, setStartBox] = useState<number | null>(null);
    const [endBox, setEndBox] = useState<number | null>(null);
    const [nombre, setNombre] = useState('');

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

    const handleClear = () => {
      setBoxes(boxes.map(box => ({ ...box, selected: false })));
      setStartBox(null);
      setEndBox(null);
      setNombre('');
    };

    const handleReset = () => {
      setBoxes(initialBoxes);
      setStartBox(null);
      setEndBox(null);
      setNombre('');
      // Add additional business logic here
    };

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();

      if (startBox !== null && endBox !== null) {
        const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        const [lower, upper] = startBox <= endBox ? [startBox, endBox] : [endBox, startBox];
        setBoxes(
          boxes.map(box =>
            box.id >= lower && box.id <= upper ? { ...box, selected: false, submitted: true, color } : box
          )
        );
        setStartBox(null);
        setEndBox(null);
        setNombre('');
      }
    };

    return (
      <div>
        <div className="grid">
          {boxes.map((box) => (
            <div
              key={box.id}
              className={`box ${box.selected ? 'selected' : box.submitted ? 'submitted' : ''}`}
              style={box.submitted ? { backgroundColor: box.color } : {}}
              onClick={() => handleBoxClick(box.id)}
            >
              {box.id}
            </div>
          ))}
        </div>
        {(startBox !== null || endBox !== null) && (
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <label>
                Nombre:
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
              </label>
              <input type="submit" value="Submit" disabled={startBox === null || endBox === null} />
            </form>
            <button type="button" onClick={handleClear}>Clear</button>

            {startBox !== null && <div>Start Box: {startBox}</div>}
            {endBox !== null && <div>End Box: {endBox}</div>}
          </div>
        )}
        <button type="button" onClick={handleReset}>Reset</button>
      </div>
    );
  };
