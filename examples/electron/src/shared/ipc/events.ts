import { CHANNELS } from './channels';

export interface IEvents {
    [CHANNELS.GET_USER_DATA]: {
        args: void,
        response?: { name: string; email: string; };
    };
    [CHANNELS.SAVE_USER]: {
        args: { name: string; };
        response: void;
    };
}