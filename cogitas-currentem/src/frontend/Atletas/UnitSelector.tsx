import React, { useState } from "react";
import { Dimension, ValueOption } from "../../electron/typeConfigs";

export const UnitSelector = ({ value, converter }: { value: number; converter: Dimension; }) => {
  const [selectedUnit, setSelectedUnit] = useState(converter.default() as ValueOption);
  return (
    <div>
      {converter.convert(value, selectedUnit)}
      <select value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value as ValueOption)}>
        {converter.getList().map((unit) => (
          <option value={unit} key={unit}>{unit}</option>
        ))}
      </select>
    </div>
  );
};
