const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { exec } = require('child_process');
const { shell } = require('electron');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

function getNoiseFilterBinaryPath() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'noise_filter');
  }
  return path.join(__dirname, '..', 'dist', 'noise_filter');
}

let pythonProcess = null;
let mainWindow = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 680,
    resizable: false,
    title: 'ClearMic',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.on('closed', () => { mainWindow = null; });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.handle('noise-filter:start', () => {
  if (pythonProcess) return { ok: true };
  const binaryPath = getNoiseFilterBinaryPath();
  pythonProcess = exec('./noise_filter', {
    cwd: path.dirname(binaryPath),
  });
  pythonProcess.on('exit', () => { pythonProcess = null; });
  return { ok: true };
});

ipcMain.handle('noise-filter:stop', () => {
  if (pythonProcess) {
    pythonProcess.kill();
    pythonProcess = null;
  }
  return { ok: true };
});

ipcMain.handle('open-external', (_event, url) => {
  shell.openExternal(url);
});

app.on('before-quit', () => {
  if (pythonProcess) { pythonProcess.kill(); pythonProcess = null; }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
  if (pythonProcess) { pythonProcess.kill(); pythonProcess = null; }
});
