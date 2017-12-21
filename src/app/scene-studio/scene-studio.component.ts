import { Component, OnInit, ElementRef } from '@angular/core';
import { SceneStudio } from './scene';
import { Vector3 } from 'three';
import { Room } from './room';
import { ImgHudObj} from './objs';
import { SphericalCordinate } from './sphericalCordinate';
import { LoaderService } from '../scene-studio/loader.service';
import { SceneService } from '../scene-studio/scene.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-scene-studio',
  templateUrl: './scene-studio.component.html',
  styleUrls: ['./scene-studio.component.css']
})
export class SceneStudioComponent implements OnInit {
  scene:SceneStudio;
  ambiente:Room;
  reception:Room;
  kitchen:Room;
  creation:Room;
  mousePositionX:number;
  mouseDown:boolean=false;

  constructor(public element:ElementRef,public loaderService:LoaderService,private sceneService:SceneService) {

  }

  ngOnInit() {
    this.sceneService.mainScene = this;
    $('#hud').mousemove((event)=>{
      if(this.mousePositionX&&this.mouseDown){
        if(this.mousePositionX!=event.clientX){
          $('.arrow').fadeOut(1000);
        }
      }
      this.mousePositionX=event.clientX;
    }).mouseup(()=>{
      this.mouseDown=false;
      this.mousePositionX=undefined;
    }).mousedown(()=>{
      this.mouseDown=true;
    });
    this.loaderService.AddOnStart(()=>{
      this.scene = new SceneStudio("black",new Vector3(0,0,0),new Vector3(50,50,50),75,$('app-scene-studio'));
      this.scene.StartRendering();
      this.scene.AddMouseControlCamera();
      this.setReception();
      if(('onorientationchange' in window)){
        this.scene.EnableDeviceControls();
        $('.arrow').css({opacity:0});
      }
    });
    this.loaderService.Start();
  }

  setReception():void {


    console.log(this.loaderService);
    this.loaderService.Add();
    this.reception = new Room('assets/imgs/imagem-recepcao.jpg',[],this.scene,()=>{
      this.loaderService.Loaded();
    });

    this.reception.Show();
    this.reception.DisableHud();
  }

  Grab(obj:MouseEvent){
    obj.srcElement.classList.add("grab");
    obj.srcElement.classList.remove("grabbing");
  }

  Grabbing(obj:MouseEvent){
    obj.srcElement.classList.remove("grab");
    obj.srcElement.classList.add("grabbing");
  }
}
