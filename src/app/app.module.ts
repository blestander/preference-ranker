import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { OptionEntryComponent } from './option-entry/option-entry.component';
import { OptionDisplayComponent } from './option-display/option-display.component';
import { OptionSortComponent } from './option-sort/option-sort.component';
import { OptionComparisonComponent } from './option-comparison/option-comparison.component';

@NgModule({
    declarations: [
        AppComponent,
        OptionEntryComponent,
        OptionDisplayComponent,
        OptionSortComponent,
        OptionComparisonComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        ReactiveFormsModule,

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
