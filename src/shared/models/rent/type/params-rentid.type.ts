import { ParamsDictionary } from 'express-serve-static-core';

export type ParamsRentId = {
    rentId: string;
} | ParamsDictionary;
