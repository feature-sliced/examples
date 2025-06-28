import { ipcMain } from 'electron';
import { CHANNELS, IEvents } from 'shared/ipc';

export const getUser = () => {
    ipcMain.handle(CHANNELS.SAVE_USER, (_, args: IEvents[typeof CHANNELS.SAVE_USER]['args']) => {
        console.log(args);
    });
};