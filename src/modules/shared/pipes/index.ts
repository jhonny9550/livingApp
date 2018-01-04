import { ParseRolePipe } from "./parse-role.pipe";
import { ParseOrderStatusPipe } from "./parse-order-status.pipe";
import { ColorOrderStatusPipe } from "./color-order-status.pipe";
import { ParseDatePipe } from "./parse-date.pipe";

export const PIPES = [
  ParseRolePipe,
  ParseOrderStatusPipe,
  ColorOrderStatusPipe,
  ParseDatePipe
];
