import { MatDrawer } from '@angular/material/sidenav'

export class SpeekDrawer {
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

// class DrawerMock {
//   open() {
//     console.log('open');
//   }
//   close() {
//     console.log('close');
//   }
//   toggle() {
//     console.log('toggle');
//   }
// }

// class Injector {
//   private _map = new Map()

//   constructor(private _providers: any[] = []) {
//     this._providers.forEach((svc) => this._map.set(svc, new svc()))
//   }

//   get(svc: any) {
//     const svcInstance = this._map.get(svc)
//     if (!svcInstance) {
//       throw Error('No provider')
//     }
//     return svcInstance
//   }
// }

// class Component {
//   constructor(readonly drawer: SpeekDrawer) {
//     drawer.init(new DrawerMock() as any)
//   }
//   toggle() {
//     this.drawer.toggle()
//   }
// }

// const injector = new Injector([SpeekDrawer])
// const component = new Component(injector.get(SpeekDrawer))
// component.toggle()
