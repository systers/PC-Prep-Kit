import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[prev]' })
export class PrevActivityDirective {
    constructor(el: ElementRef) {
        el.nativeElement.style.width = '75px';
        el.nativeElement.style.lineHeight = '75px';
        el.nativeElement.style.textAlign = 'center';
        el.nativeElement.style.opacity = 1;
        el.nativeElement.style.border = 'none';
        el.nativeElement.style.color = 'white'
        el.nativeElement.style.borderRadius = '50%';
        el.nativeElement.style.background = '#D9534F';
    }
}
