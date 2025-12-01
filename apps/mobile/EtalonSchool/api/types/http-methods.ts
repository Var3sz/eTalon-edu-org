import { HTTPMethodConst } from '../consts/http';

export type HTTPMethodConstantType = (typeof HTTPMethodConst)[keyof typeof HTTPMethodConst];
