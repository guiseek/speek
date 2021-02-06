import { Injectable } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private instance: MatDrawer

  init(drawer: MatDrawer) {
    this.instance = drawer
  }

  get opened() {
    return this.instance.open()
  }

  open() {
    this.instance.open()
  }

  close() {
    this.instance.close()
  }

  toggle() {
    this.instance.toggle()
  }
}
