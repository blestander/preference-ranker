import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OptionEntryComponent } from './option-entry/option-entry.component';

@NgModule({
    declarations: [
        AppComponent,
        OptionEntryComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
