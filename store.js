import { atom } from 'jotai';
import { getFavourites, getHistory } from './lib/userData';

export const favouritesAtom = atom();
export const searchHistoryAtom = atom();

