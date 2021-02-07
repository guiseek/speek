import { MaterialModule, SharedUiModule } from '@speek/shared/ui';
import { FeatureContactContainer } from './feature-contact/feature-contact.container'
import { AdapterDataAccessModule } from '@speek/adapter/data-access'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    SharedUiModule,
    MaterialModule,
    AdapterDataAccessModule,
    RouterModule.forChild([{ path: '', component: FeatureContactContainer }]),
  ],
  declarations: [FeatureContactContainer],
})
export class FeatureContactModule {}
