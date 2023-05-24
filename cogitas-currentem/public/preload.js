const { contextBridge, ipcRenderer } = require('electron');

const ipc = {
  'render': {
      // From render to main.
      'send': [
          'setObjectList'
      ],
      // From main to render.
      'receive': [
          'getObjectList'
      ]
  }
};

contextBridge.exposeInMainWorld('electron', {
  getAtletas: () => ipcRenderer.invoke('get-atletas'),
  setAtletas: (atletasList) => {ipcRenderer.invoke('set-atletas', atletasList)},
});
