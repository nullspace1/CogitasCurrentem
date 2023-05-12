import { Schema } from "electron-store";
import { Lap } from "../model/entrenamiento";

const LapSchema: Schema<{ laps: Lap[] }> = {
    laps: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          distancia: { type: 'number' },
          tiempo: { type: 'number' },
        },
      },
    },
  };

  export {LapSchema}
