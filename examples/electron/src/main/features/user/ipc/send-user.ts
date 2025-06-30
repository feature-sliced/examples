import { ipcMain } from 'electron';
import { CHANNELS } from 'shared/ipc';

export const sendUser = () => {
    ipcMain.on(CHANNELS.GET_USER_DATA, ev => {
        ev.returnValue = {
            name: 'John Doe',
            email: 'john.doe@example.com',
        };
    });
};