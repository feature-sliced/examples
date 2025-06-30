import { join } from 'path';
import { BrowserWindow } from 'electron';

export const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 640,
        height: 320,
        show: false,
        title: 'Feature-Sliced Design',
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
        },
    });

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    if (process.env['ELECTRON_RENDERER_URL']) {
        void mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
        void mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
    }
};