import { NgModule } from '@angular/core';
import { PIPES } from "./pipes/index";

@NgModule({
  imports: [],
  exports: [...PIPES],
  declarations: [...PIPES],
  providers: [...PIPES],
})
export class SharedModule { }
