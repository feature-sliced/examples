import { CHANNELS } from 'shared/ipc';

export const getUser = () => {
    const user = window.electron[CHANNELS.GET_USER_DATA]();

    return user ?? { name: 'John Donte', email: 'john.donte@example.com' };
};