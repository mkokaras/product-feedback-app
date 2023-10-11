import { NgModule } from '@angular/core';

import { defineCustomElements } from 'packages/stencil-library/loader';

import { MyComponent, StencilButton } from './stencil-generated/proxies';

defineCustomElements(window);

@NgModule({
  imports: [],
  declarations: [MyComponent, StencilButton],
  exports: [MyComponent, StencilButton],
})
export class WebComponentsModule {}
