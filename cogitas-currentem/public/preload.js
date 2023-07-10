const { contextBridge, ipcRenderer } = require('electron');

const ipc = {
  'render': {
      // From render to main.
      'send': [
          'saveAtleta','getAllAtletas','deleteAtleta'
      ],
      // From main to render.
      'receive': [
        'saveAtleta','getAtleta','getAllAtletas'
      ]
  }
};

contextBridge.exposeInMainWorld('electron', {

  saveAtleta :  (atleta) => ipcRenderer.invoke('saveAtleta',atleta),
  getAllAtletas :  () => ipcRenderer.invoke('getAllAtletas'),
  deleteAtleta : (atleta ) => {ipcRenderer.invoke('deleteAtleta',atleta)},
  getAtleta : (id) => ipcRenderer.invoke('getAtleta',id)

});

