import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
    selector: 'app-option-entry',
    templateUrl: './option-entry.component.html',
    styleUrls: ['./option-entry.component.scss']
})
export class OptionEntryComponent {

    @Output() optionsSubmit = new EventEmitter<string[]>();

    formControl = new FormControl("");

    constructor (private fb: FormBuilder) {
        this.formControl.addValidators((control) => {
            const value = control.value as string;
            const lines = value
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);
            if (lines.length >= 2)
                return null;
            else
                return { notEnoughLines: true };
        })
    }

    get shouldDisableButton(): boolean {
        return this.formControl.invalid;
    }

    submit(): void {
        const value = this.formControl.value as string;
        const lines = value
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        console.debug(lines);
        this.optionsSubmit.emit(lines);
    }
}
