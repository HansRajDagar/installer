const { ipcRenderer } = require('electron');

// Example: Sending a message from renderer process to main process
ipcRenderer.send('message-from-renderer', 'Hello from renderer process!');

// Example: Receiving a message from main process
ipcRenderer.on('message-from-main', (event, data) => {
    console.log('Received message from main process:', data);
});

// You can add more code here for interacting with the UI or other tasks in the renderer process
