import { NgModule } from '@angular/core';
import { PIPES } from "./pipes/index";
import { DIRECTIVES } from "./directives/index";

@NgModule({
  imports: [],
  exports: [...PIPES, ...DIRECTIVES],
  declarations: [...PIPES, ...DIRECTIVES],
  providers: [...PIPES],
})
export class SharedModule { }
