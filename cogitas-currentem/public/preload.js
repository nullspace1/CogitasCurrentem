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
  setObjectList: (objects,string) => {ipcRenderer.invoke('setObjectList',objects,string)},
  getObjectList: (string) =>
    ipcRenderer.invoke('getObjectList',string),
});
