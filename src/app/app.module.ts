import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
//scene-studio
import { LoaderService } from './scene-studio/loader.service';
import { SceneService } from './scene-studio/scene.service';
import { SceneStudioComponent } from './scene-studio/scene-studio.component';


@NgModule({
  declarations: [
    AppComponent,
    SceneStudioComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    LoaderService,
    SceneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
