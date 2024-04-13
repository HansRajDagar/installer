// const { app, BrowserWindow } = require('electron');
// const express = require('express');
// const path = require('path');
// const { spawn } = require('child_process');

// const expressApp = express();


// expressApp.use(express.static(path.join(__dirname, '..', 'recipe-app', 'dist')));

// //Route for serving index.html
// expressApp.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'recipe-app', 'dist', 'index.html'));
// });


// expressApp.get('/api/data', (req, res) => {
//     const djangoProcess = spawn('python', [path.join(__dirname, '..', 'fullstack','full', 'manage.py'), 'runserver']);

//     djangoProcess.stdout.on('data', (data) => {
//         console.log(`Django stdout: ${data}`);
//     });

//     djangoProcess.stderr.on('data', (data) => {
//         console.error(`Django stderr: ${data}`);
//     });

//     res.send('Django server running on port 8000');
// });

// const server = expressApp.listen(3000, () => {
//     console.log('Express server running on port 3000');
// });

// function createWindow() {
//     const win = new BrowserWindow({
//         width: 1000,
//         height: 800,
//         webPreferences: {
//             nodeIntegration: true
//         }
//     });

//     // Load Angular app from Express server
//     win.loadURL('http://localhost:3000');

//     // Open DevTools if needed
//     win.webContents.openDevTools();
// }

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//     server.close(); // Close Express server when all windows are closed
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow();
//     }
// });



const { app, BrowserWindow } = require('electron');
// const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const url = require('url');
require('dotenv').config({ path: path.join(__dirname, 'fullstack', 'venv') });
// const expressApp = express();


let djangoProcess;

function startDjangoServer() {
//     // Activate virtual environment and start Django server using a child process
const activateEnv = path.join(__dirname,  'fullstack', 'venv', 'Scripts', 'activate');
const pythonPath = path.join(__dirname, 'fullstack', 'venv', 'Scripts', 'python.exe');
const managePyPath = path.join(__dirname,  'fullstack', 'full', 'manage.py');

    // Activate the virtual environment
    djangoProcess = spawn(activateEnv, [], { shell: true });

    djangoProcess.on('exit', (code, signal) => {
        console.log(`Python virtual environment activated with code ${code} and signal ${signal}`);

        // Start the Django server
        const djangoServerProcess = spawn(pythonPath, [managePyPath, 'runserver'], { cwd: path.join(__dirname, 'fullstack', 'full') });

        djangoServerProcess.stdout.on('data', (data) => {
            console.log(`Django server output: ${data}`);
        });

        djangoServerProcess.stderr.on('data', (data) => {
            console.error(`Django server error: ${data}`);
        });
    });

}

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: false, // Disable Node.js integration
            contextIsolation: true, // Enable context isolation
            sandbox: true, // Enable sandbox mode
            preload: path.join(__dirname, 'preload.js'), // Preload script
            contentSecurityPolicy: `
                default-src 'self';
                script-src 'self' 'unsafe-inline';
                style-src 'self' 'unsafe-inline';
            `
        }
    });
    startDjangoServer();

    // Load the index.html file
    win.loadURL(url.format({
        pathname: path.join(__dirname,'angular-build','recipe-app', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
        // Activate virtual environment and start Django server when Electron app is ready
    

    // Open DevTools if needed
    win.webContents.openDevTools();
}


app.whenReady().then(createWindow);


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Quit Django server when Electron app is closed
app.on('before-quit', () => {

    
    // console.log("the value of djangoServerProcess")


    // if(djangoServerProcess){
    //     djangoServerProcess.kill();
    // }

    if (djangoProcess) {
        console.log("The Django Process is Killed!")
        djangoProcess.kill();
    }


});
