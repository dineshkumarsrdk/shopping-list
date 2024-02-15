import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective{
    constructor(private elref: ElementRef) {}

    @HostBinding('class.open') isOpen = false;

    @HostListener('document:click', ['$event']) toggleOpen(event: Event){
        //this.isOpen = !this.isOpen;
        this.isOpen = this.elref.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
}