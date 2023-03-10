import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'preference-ranker';
    stage: 'list' | 'sort' | 'display' = 'list';
    options: string[] = []

    switchToSort(options: string[]): void {
        this.stage = 'sort';
        this.options = options;
    }

    switchToDisplay(options: string[]): void {
        this.stage = 'display';
        this.options = options;
    }
}
