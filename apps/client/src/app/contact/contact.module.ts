import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as fromPeer from './+state/peer.reducer'
import { PeerEffects } from './+state/peer.effects'
import { PeerComponent } from './peer/peer.component'

const routes: Routes = [{ path: '', component: PeerComponent }]

@NgModule({
  declarations: [PeerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromPeer.PEER_FEATURE_KEY, fromPeer.reducer),
    EffectsModule.forFeature([PeerEffects]),
  ],
})
export class ContactModule {}
