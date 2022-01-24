import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, IonHeader, ModalController } from '@ionic/angular';
import Konva from 'konva';
import { CanvasBaseClass } from '../base-classes/canvas-base-class';
import { OmbrelloneService } from '../services/ombrellone.service';

@Component({
  selector: 'app-huge-img',
  templateUrl: './huge-img.page.html',
  styleUrls: ['./huge-img.page.scss'],
})
export class HugeImgPage extends CanvasBaseClass implements OnInit {

  deleteUmbrella: any;

  @ViewChild('container') container: ElementRef;
  @ViewChild('header', { static: true }) header: IonHeader;
  @ViewChild('dragItems') dragItems: ElementRef;

  stage: Konva.Stage;

  imgSize = 40;

  constructor(
    protected ac: AlertController,
    protected mc: ModalController,
    private fb: FormBuilder,
    private os: OmbrelloneService
  ) {
    super(ac, mc);
    this.form = this.fb.group({

    });
  }



  ionViewDidEnter(): void {
    setTimeout(() => {
      console.log(this.container.nativeElement.clientWidth);
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
        const layer = this.mapLayer;


        var WIDTH = largerWidth;
        var HEIGHT = largerHeight;

        const PADDING = 5;

        // now draw our bars
        var scrollLayers = new Konva.Layer();
        stage.add(scrollLayers);

        this.addTrashBinLayerToStage(canvasWidth, canvasHeight);

        var verticalBar = new Konva.Rect({
          width: 10,
          height: 100,
          fill: 'grey',
          opacity: 0.8,
          x: stage.width() - PADDING - 10,
          y: PADDING,
          draggable: true,
          dragBoundFunc: function (pos) {
            pos.x = stage.width() - PADDING - 10;
            pos.y = Math.max(
              Math.min(pos.y, stage.height() - this.height() - PADDING),
              PADDING
            );
            return pos;
          },
        });
        scrollLayers.add(verticalBar);

        verticalBar.on('dragmove', () => {
          // delta in %
          const availableHeight =
            stage.height() - PADDING * 2 - verticalBar.height();
          var delta = (verticalBar.y() - PADDING) / availableHeight;

          layer.y(-(HEIGHT - stage.height()) * delta);
          this.rectTrashBin.y(-(HEIGHT - stage.height()) * delta);
        });

        var horizontalBar = new Konva.Rect({
          width: 100,
          height: 10,
          fill: 'grey',
          opacity: 0.8,
          x: PADDING,
          y: stage.height() - PADDING - 10,
          draggable: true,
          dragBoundFunc: function (pos) {
            pos.x = Math.max(
              Math.min(pos.x, stage.width() - this.width() - PADDING),
              PADDING
            );
            pos.y = stage.height() - PADDING - 10;

            return pos;
          },
        });
        scrollLayers.add(horizontalBar);

        horizontalBar.on('dragmove', () => {
          // delta in %
          const availableWidth =
            stage.width() - PADDING * 2 - horizontalBar.width();
          var delta = (horizontalBar.x() - PADDING) / availableWidth;

          layer.x(-(WIDTH - stage.width()) * delta);
          this.rectTrashBin.x(-(WIDTH - stage.width()) * delta);
        });

        const imgSize = this.imgSize;
        const globalHeight = canvasHeight;


        const trashLayer = this.rectTrashBin;

        stage.on('wheel', function (e) {
          // prevent parent scrolling
          e.evt.preventDefault();
          const dx = e.evt.deltaX;
          const dy = e.evt.deltaY;
          const minX = -(WIDTH - stage.width());
          const maxX = 0;

          const x = Math.max(minX, Math.min(layer.x() - dx, maxX));

          const minY = -(HEIGHT - stage.height());
          const maxY = 0;

          const y = Math.max(minY, Math.min(layer.y() - dy, maxY));

          layer.position({ x, y });
          // trashLayer.position({ x, y });

          const availableHeight =
            stage.height() - PADDING * 2 - verticalBar.height();
          const vy =
            (layer.y() / (-HEIGHT + stage.height())) * availableHeight + PADDING;
          verticalBar.y(vy);

          const availableWidth =
            stage.width() - PADDING * 2 - horizontalBar.width();

          const hx =
            (layer.x() / (-WIDTH + stage.width())) * availableWidth + PADDING;
          horizontalBar.x(hx);

        });






        this.makeUmbrellaDraggable();
      };

      this.os.getOmbrelloni().subscribe(umb => {
        console.log('umb', umb);


        umb.map(o => {
          console.log('ok', o)
          this.addImage({
            x: +o.x,
            y: +o.y
          })
        })

      });


    }, 200)
  }

  generateNode(WIDTH: number, HEIGHT: number): Konva.Circle {
    return new Konva.Circle({
      x: WIDTH * Math.random(),
      y: HEIGHT * Math.random(),
      radius: 50,
      fill: 'red',
      stroke: 'black',
    });
  }

  ngOnInit() {
  }



}
