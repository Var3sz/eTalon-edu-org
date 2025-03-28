import { HTTPMethodConst } from '../consts/HTTP';

export type HTTPMethodConstantType = (typeof HTTPMethodConst)[keyof typeof HTTPMethodConst];
