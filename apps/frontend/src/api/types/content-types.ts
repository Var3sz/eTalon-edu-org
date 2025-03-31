import { ContentTypeConst } from '../consts/http';

export type ContentTypeConstantType = (typeof ContentTypeConst)[keyof typeof ContentTypeConst];
