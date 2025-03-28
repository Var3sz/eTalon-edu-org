import { ContentTypeConst } from '../consts/HTTP';

export type ContentTypeConstantType = (typeof ContentTypeConst)[keyof typeof ContentTypeConst];
