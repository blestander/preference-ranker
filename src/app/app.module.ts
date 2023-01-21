import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { OptionEntryComponent } from './option-entry/option-entry.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OptionDisplayComponent } from './option-display/option-display.component';

@NgModule({
    declarations: [
        AppComponent,
        OptionEntryComponent,
        OptionDisplayComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        ReactiveFormsModule,

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
