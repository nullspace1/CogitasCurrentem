const { contextBridge, ipcRenderer } = require('electron');

const ipc = {
  'render': {
      // From render to main.
      'send': [
          'setAtletas'
      ],
      // From main to render.
      'receive': [
          'getAtletas'
      ]
  }
};

contextBridge.exposeInMainWorld('electron', {
  getAtletas: () => ipcRenderer.invoke('get-atletas'),
  setAtletas: (atletasList) => {ipcRenderer.invoke('set-atletas', atletasList)},
});
