import { getUser, sendUser } from '#/features/user';

export const ipcHandlers = () => {
    getUser();
    sendUser();
};