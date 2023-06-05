"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtletaForm = void 0;
const react_1 = __importStar(require("react"));
const atleta_1 = require("../../electron/model/atleta");
const persistence_1 = require("../persistence/persistence");
function AtletaForm({ id }) {
    const [atletaData, setData] = (0, react_1.useState)({
        nombre: "",
        fechaNacimiento: "",
        altura: 0,
        sexo: atleta_1.Sexo.Hombre,
        aniosEntrenamiento: 0,
        peso: 0,
        objetivos: ""
    });
    const [notEdited, setEdited] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        if (notEdited) {
            const getAtletaExistente = async (id) => {
                const atleta = ((await new persistence_1.DatabaseInterface(persistence_1.ExistingDatabase.atleta).getAll()).filter(a => a.id === id)[0]);
                if (id !== "") {
                    setData({
                        nombre: atleta.getNombre(),
                        fechaNacimiento: atleta.getFechaNacimiento().toISOString().split('T')[0],
                        altura: atleta.getAltura(),
                        sexo: atleta.getSexo(),
                        aniosEntrenamiento: atleta.getAniosEntrenamiento(),
                        peso: atleta.getPeso(),
                        objetivos: atleta.getObjetivos()
                    });
                }
            };
            getAtletaExistente(id);
            setEdited(false);
        }
    }, [atletaData]);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const type = event.target.type;
        setData(prevData => ({ ...prevData, [name]: type === "number" ? parseInt(value, 10) : value }));
    };
    const crearAtleta = async () => {
        const db = new persistence_1.DatabaseInterface(persistence_1.ExistingDatabase.atleta);
        var atleta = new atleta_1.Atleta(atletaData.nombre, new Date(atletaData.fechaNacimiento), atletaData.peso, atletaData.altura, atletaData.sexo, atletaData.aniosEntrenamiento, atletaData.objetivos);
        if (id !== "") {
            const atletaViejo = await db.getById(id);
            await db.replace(atletaViejo, atleta);
        }
        else {
            await db.add(atleta);
        }
    };
    return (react_1.default.createElement("form", { onSubmit: crearAtleta },
        react_1.default.createElement("h2", null, " Datos Fisicos "),
        react_1.default.createElement("label", { htmlFor: "nombre" }, "Nombre"),
        react_1.default.createElement("input", { onChange: handleChange, type: "text", id: "nombre", name: "nombre", value: atletaData.nombre }),
        react_1.default.createElement("label", { htmlFor: "fechaNacimiento" }, " Fecha de nacimiento "),
        react_1.default.createElement("input", { onChange: handleChange, type: "date", id: "fechaNacimiento", name: "fechaNacimiento", value: atletaData.fechaNacimiento }),
        react_1.default.createElement("label", { htmlFor: "altura" }, " Altura (en cm)"),
        react_1.default.createElement("input", { onChange: handleChange, type: "number", min: 0, id: "altura", name: "altura", value: atletaData.altura }),
        react_1.default.createElement("label", { htmlFor: "sexo" }, " Sexo "),
        react_1.default.createElement("select", { onChange: handleChange, name: "sexo", value: atletaData.sexo },
            react_1.default.createElement("option", { value: atleta_1.Sexo.Hombre }, " Hombre "),
            react_1.default.createElement("option", { value: atleta_1.Sexo.Mujer }, " Mujer ")),
        react_1.default.createElement("label", { htmlFor: "peso" }, " Peso (en kg) "),
        react_1.default.createElement("input", { onChange: handleChange, type: "number", name: "peso", value: atletaData.peso }),
        react_1.default.createElement("h2", null, " Sobre Atletismo"),
        react_1.default.createElement("label", { htmlFor: "aniosEntrenamiento" }, "A\u00F1os de Entrenamiento"),
        react_1.default.createElement("input", { onChange: handleChange, type: "number", min: 0, name: "aniosEntrenamiento", value: atletaData.aniosEntrenamiento }),
        react_1.default.createElement("label", { htmlFor: "objetivos" }, " Objetivos "),
        react_1.default.createElement("input", { onChange: handleChange, type: "text", name: "objetivos", value: atletaData.objetivos }),
        react_1.default.createElement("button", { type: "submit" }, " Cargar ")));
}
exports.AtletaForm = AtletaForm;
//# sourceMappingURL=AtletaForm.js.map