import { Request } from "express";

export interface RequestTyped<T> extends Request {
  body: T;
}
