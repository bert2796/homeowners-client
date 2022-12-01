import { Routes, routes } from '../constants';

export const getRoutePath = (route: Routes) => routes?.[route].path;
