import { app, BrowserWindow } from 'electron';
import { createWindow } from './create-window';
import { ipcHandlers } from './ipc-handlers';

(async () => {
    await app.whenReady();
    ipcHandlers();
    createWindow();

    app.on('activate', () => {
        if (!BrowserWindow.getAllWindows().length) {
            createWindow();
        }
    });
})();

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});