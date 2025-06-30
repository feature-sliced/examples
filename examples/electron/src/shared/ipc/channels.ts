export const CHANNELS = {
    GET_USER_DATA: 'GET_USER_DATA',
    SAVE_USER: 'SAVE_USER',
} as const;

export type TChannelKeys = keyof typeof CHANNELS;