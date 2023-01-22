import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IndexPair } from '../index-pair';

@Component({
    selector: 'app-option-sort',
    templateUrl: './option-sort.component.html',
    styleUrls: ['./option-sort.component.scss']
})
export class OptionSortComponent implements OnChanges {

    @Input() options: string[] = [];
    @Output() submit = new EventEmitter<string[]>();

    table: number[][] = [];
    currentPair?: IndexPair;
    nextPairs: IndexPair[] = [];
    skippedPairs: IndexPair[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        // If options change, reset stage
        if ('options' in changes && this.options.length > 0)
            this.reset();
    }

    onPreferenceSelected(pair: IndexPair): void {
        const winner = pair.a;
        const loser = pair.b

        // Mark the winner as beating the loser
        this.table[winner][loser] = -1;
        this.table[loser][winner] = 1;

        // Mark down all transitive wins and losses
        for (let i = 0; i < this.options.length; i++)
            if (i != winner && i != loser)
                if (this.table[loser][i] < 0) { // If the loser beats I, the winner should also beat I
                    this.table[winner][i] = -1;
                    this.table[i][winner] = 1;
                } else if (this.table[winner][i] > 0) { // If I beats the winner, I should also beat the loser
                    this.table[loser][i] = 1;
                    this.table[i][loser] = -1;
                }

        // Advance the pairs
        delete this.currentPair;
        this.advancePairs();
    }

    skipCurrentPair(): void {
        if (this.currentPair) {
            this.skippedPairs.push(this.currentPair);
            delete this.currentPair;
            this.advancePairs();
        }
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
        const finalList = this.generateSortedList();
        this.submit.emit(finalList);
    }

    private reset(): void {
        // Generate graph/comparison table
        this.table = new Array(this.options.length);
        for (let i = 0; i < this.options.length; i++) {
            this.table[i] = new Array(this.options.length);
            this.table[i].fill(0);
        }

        // Void all currently stored pairs
        delete this.currentPair;
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
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    private generateSortedList(): string[] {
        // Order the indices using the comparison table
        const indices = new Array(this.options.length);
        for (let i = 0; i < indices.length; i++)
            indices[i] = i;
        indices.sort((a, b) => this.table[a][b]);

        // Convert the indices into their options
        const options = indices.map(i => this.options[i]);
        return options;
    }
}
