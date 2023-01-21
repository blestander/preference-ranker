import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IndexPair } from '../index-pair';

@Component({
    selector: 'app-option-sort',
    templateUrl: './option-sort.component.html',
    styleUrls: ['./option-sort.component.scss']
})
export class OptionSortComponent implements OnChanges {

    @Input() options: string[] = [];

    table: number[][] = [];
    currentPair: IndexPair | null = null;
    nextPairs: IndexPair[] = [];
    skippedPairs: IndexPair[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        // If options change, reset stage
        if ('options' in changes && this.options.length > 0)
            this.reset();
    }

    private advancePairs(): void {
        if (this.nextPairs.length == 0) // Ran out of unseen pairs in nextPairs
            if (this.skippedPairs.length > 0) { // Have skipped pairs we can reshuffle back into nextPairs
                this.nextPairs = this.skippedPairs;
                this.shuffle(this.nextPairs);
                this.skippedPairs = [];
            }

        while (this.nextPairs.length > 0) { // While there are still pairs to work with
            const nextPair = this.nextPairs.pop() as IndexPair;
            if (this.table[nextPair.a][nextPair.b] == 0) { // If we don't know this pair's relationship...
                // ... let's ask the user for this pair's relationship
                this.currentPair = nextPair;
                return;
            } // Else: this pair is handled; discard it
        }

        // If we reach this point, we have relationships for all pairs
        // TODO Submit options
    }

    private reset(): void {
        // Generate graph/comparison table
        this.table = new Array(this.options.length);
        for (let i = 0; i < this.options.length; i++) {
            this.table[i] = new Array(this.options.length);
            this.table[i].fill(0);
        }

        // Void all currently stored pairs
        this.currentPair = null;
        this.nextPairs = [];
        this.skippedPairs = [];

        // Generate pairs to compare
        for (let i = 0; i < this.options.length; i++)
            for (let j = i + 1; j < this.options.length; j++) {
                const old = this.nextPairs.length;
                this.nextPairs.push(new IndexPair(i, j));
            }

        // Shuffle pairs
        this.shuffle(this.nextPairs);

        // Put the first pair up for comparison
        this.advancePairs();
    }

    private shuffle<T>(array: T[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
}
