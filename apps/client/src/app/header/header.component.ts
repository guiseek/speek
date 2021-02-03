import { WithTarget } from './../database'
import {
  Component,
  Input,
  ElementRef,
  Renderer2,
  OnInit,
  HostListener,
} from '@angular/core'
import { NetworkService } from '../network.service'

@Component({
  selector: 'speek-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input('scrollArea') scrollArea: any
  @Input('headerHeight') headerHeight: number
  newHeaderHeight: any

  time = new Date()

  upload$ = this.network.upload$
  download$ = this.network.download$
  connection$ = this.network.connection$

  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    readonly network: NetworkService
  ) {}

  networnState() {
    this.network.loadUp()
    this.network.loadDown()
  }

  ngOnInit() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'height',
      this.headerHeight + 'px'
    )

    window.onscroll = function (ev) {
      console.log(ev)
    }
    // this.scrollArea.ionScroll
    // .subscribe((ev) => {
    //   this.resizeHeader(ev)
    // })
  }

  @HostListener('scroll', ['$event'])
  onScroll({ target }: WithTarget<Element & { domWrite: Function }>) {
    console.log(event)
    target.domWrite = window.requestAnimationFrame
    this.resizeHeader(target)
  }

  resizeHeader(ev: Element & { domWrite: Function }) {
    ev.domWrite(() => {
      document.onscroll
      this.newHeaderHeight = this.headerHeight - ev.scrollTop

      if (this.newHeaderHeight < 0) {
        this.newHeaderHeight = 0
      }

      this.renderer.setStyle(
        this.element.nativeElement,
        'height',
        this.newHeaderHeight + 'px'
      )

      for (const headerElement of this.element.nativeElement.children) {
        const totalHeight = headerElement.offsetTop + headerElement.clientHeight

        if (totalHeight > this.newHeaderHeight && !headerElement.isHidden) {
          headerElement.isHidden = true
          this.renderer.setStyle(headerElement, 'opacity', '0')
        } else if (
          totalHeight <= this.newHeaderHeight &&
          headerElement.isHidden
        ) {
          headerElement.isHidden = false
          this.renderer.setStyle(headerElement, 'opacity', '0.7')
        }
      }
    })
  }
}
