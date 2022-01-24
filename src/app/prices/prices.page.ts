import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, IonHeader, ModalController } from '@ionic/angular';
import Konva from 'konva';
import { CanvasBaseClass } from '../base-classes/canvas-base-class';
import { OmbrelloneService } from '../services/ombrellone.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.page.html',
  styleUrls: ['./prices.page.scss'],
})
export class PricesPage extends CanvasBaseClass implements OnInit {
  @ViewChild('container') container: ElementRef;
  @ViewChild('header', { static: true }) header: IonHeader;
  @ViewChild('dragItems') dragItems: ElementRef;

  imgSize = 40;

  constructor(protected ac: AlertController,
    protected mc: ModalController,
    private fb: FormBuilder,
    private os: OmbrelloneService
  ) {
    super(ac, mc);
  }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    setTimeout(() => {
      const canvasWidth = this.container.nativeElement.clientWidth; // this.container.nativeElement.innerWidth;
      const canvasHeight = this.container.nativeElement.clientHeight - this.header['el'].clientHeight;

      const backgroundImage = new Image();
      backgroundImage.src = 'assets/square.png';
      backgroundImage.onload = (img: Event) => {
        const path = img['path'][0];
        const { width: imageWidth, height: imageHeight } = path;

        const largerWidth = imageWidth;
        const largerHeight = imageHeight

        this.stage = new Konva.Stage({
          container: 'container',
          width: canvasWidth,
          height: canvasHeight,
        });

        const stage = this.stage;

        const rect = new Konva.Rect({
          x: 0,
          y: 0,
          width: imageWidth,
          height: imageHeight,
          fillPatternImage: backgroundImage,
          //fillPatternOffset: { x : -220, y : 70},
          stroke: 'black',
          strokeWidth: 4,
          fillPatternRepeat: 'no-repeat',
          zIndex: -1 //doesn't work here or in Image object
        });

        this.umbrellaGroup = new Konva.Group({
          imageWidth,
          imageHeight,
        });

        this.mapLayer = new Konva.Layer();

        this.mapLayer.add(rect);
        this.mapLayer.add(this.umbrellaGroup);

        this.stage.add(this.mapLayer);

        this.mapLayer.add(rect);
        stage.add(this.mapLayer);

        // now draw our bars
        var scrollLayers = new Konva.Layer();
        stage.add(scrollLayers);
      }
    }, 200);
  }

}
