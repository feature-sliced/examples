import { CHANNELS } from 'shared/ipc';

export const saveUser = (name: string) => {
    window.electron[CHANNELS.SAVE_USER]({ name });
};