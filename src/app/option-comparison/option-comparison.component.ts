import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IndexPair } from '../index-pair';

@Component({
    selector: 'app-option-comparison',
    templateUrl: './option-comparison.component.html',
    styleUrls: ['./option-comparison.component.scss']
})
export class OptionComparisonComponent implements OnChanges {
    @Input() options!: string[];
    @Input() currentPair?: IndexPair;

    first?: IndexPair;
    second?: IndexPair;

    ngOnChanges(changes: SimpleChanges): void {
        if ('currentPair' in changes) {
            if (this.currentPair) {
                const reverseOrder = Math.random() >= 0.5;
                const reversed = new IndexPair(this.currentPair.b, this.currentPair.a);

                if (reverseOrder) {
                    this.first = reversed;
                    this.second = this.currentPair;
                } else {
                    this.first = this.currentPair;
                    this.second = reversed;
                }
            } else {
                delete this.first;
                delete this.second;
            }
        }
    }
}
