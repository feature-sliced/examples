import { TElectronAPI } from './preload';

declare global {
    interface Window {
        electron: TElectronAPI;
    }
}