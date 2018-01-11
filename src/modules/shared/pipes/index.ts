import { ParseRolePipe } from "./parse-role.pipe";
import { ParseOrderStatusPipe } from "./parse-order-status.pipe";
import { ColorOrderStatusPipe } from "./color-order-status.pipe";
import { ParseDatePipe } from "./parse-date.pipe";
import { CapitalizePipe } from "./capitalize.pipe";

export const PIPES = [
  ParseRolePipe,
  ParseOrderStatusPipe,
  ColorOrderStatusPipe,
  ParseDatePipe,
  CapitalizePipe
];
