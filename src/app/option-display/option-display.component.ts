import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-option-display',
    templateUrl: './option-display.component.html',
    styleUrls: ['./option-display.component.scss']
})
export class OptionDisplayComponent {

    @Input() options: string[] = [];
}
