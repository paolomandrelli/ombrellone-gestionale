import { ElementRef, ViewChild } from '@angular/core';
import { AlertController, ModalController, ModalOptions } from '@ionic/angular';
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import { NgxStronglyTypedFormsModule } from 'ngx-strongly-typed-forms';
import { UmbrellaModalComponent } from '../shared/umbrella-modal/umbrella-modal.component';

export abstract class CanvasBaseClass {

    form: NgxStronglyTypedFormsModule;

    abstract dragItems: ElementRef;

    abstract imgSize: number;

    stage: Konva.Stage;

    /**
       * Gestione cestino
       */
    trashBinLayer: Konva.Layer;
    rectTrashBin: Konva.Rect;
    trashBin: Konva.Image;



    mapLayer: Konva.Layer;

    umbrellaGroup: Konva.Group;

    /**
     * La quantità di scaling da fare ad ogni evento wheel.
     */
    scaleBy = 1.01;

    droppingOnBin = false;

    itemURL = 'http://localhost:8100/assets/parasol.png';

    /** 
     * Quando clicco su un ombrellone per vederne il dettaglio
    */
    selectedUmbrella: Konva.Image;

    constructor(
        protected ac: AlertController,
        protected mc: ModalController
    ) {

    }

    /**
     * Questo metodo prepara il layer dove è ospitato il secchio, per eliminare ombrelloni già presenti
     * o perlomeno per chiedere al server se è possibile eliminarli.
     * Utilizza come contesto d'esecuzione la classe base, che ha già lo stage e il layer relativo
     * al cestino.
     * @param canvasWidth lo stage principale
     * @param globalHeight il layer in cui è presente solo il cestino
     */
    protected addTrashBinLayerToStage(canvasWidth: number, globalHeight: number): void {
        this.trashBinLayer = new Konva.Layer({

        });

        this.rectTrashBin = new Konva.Rect({
            height: this.imgSize,
            width: this.imgSize,
            fill: 'red',
            x: (canvasWidth / 2) - this.imgSize,
            y: globalHeight - (this.imgSize + 10)
        });

        this.trashBinLayer.add(this.rectTrashBin);

        this.stage.add(this.trashBinLayer);

        Konva.Image.fromURL('/assets/bin.png', (trashBin: Konva.Image) => {
            this.trashBin = trashBin;
            this.trashBin.width(this.imgSize);
            this.trashBin.height(this.imgSize);
            this.trashBin.setAttr('uniqueId', 'trashBin');
            this.trashBinLayer.add(this.trashBin);

            this.trashBin.position({ x: (canvasWidth / 2) - this.imgSize, y: globalHeight - (this.imgSize + 10) });
            this.trashBin.draggable(false);

        });
    }

    protected makeUmbrellaDraggable(): void {

        var con = this.stage.container();
        con.addEventListener('dragover', function (e) {
            e.preventDefault(); // !important
        });

        con.addEventListener('drop', (e) => {
            e.preventDefault();
            // now we need to find pointer position
            // we can't use stage.getPointerPosition() here, because that event
            // is not registered by Konva.Stage
            // we can register it manually:
            this.stage.setPointersPositions(e);

            console.log('item url is now', this.itemURL);

            this.addImage();


        });

        console.log('dragitems', this.dragItems);
        this.dragItems.nativeElement
            .addEventListener('dragstart', (e) => {
                this.itemURL = e.target['src'];
                console.log('itemurl', this.itemURL);
            });

    }

    protected addImage(positionedObject?: { x: number, y: number }): void {
        Konva.Image.fromURL(this.itemURL, (image: Konva.Image) => {
            image.setAttrs({
                width: this.imgSize,
                height: this.imgSize,
            })
            image.width(this.imgSize)
            image.height(this.imgSize)
            this.umbrellaGroup.add(image);
            this.mapLayer.batchDraw();

            const stagePosition = this.stage.getPointerPosition();
            console.log({ positionedObject });
            const position: Vector2d = {
                x: positionedObject ? positionedObject.x : (stagePosition.x - this.mapLayer.x()),
                y: positionedObject ? positionedObject.y : (stagePosition.y - this.mapLayer.y())
            };

            image.position(position);
            image.draggable(true);

            image.on('click', () => {
                // in questo evento un ombrellone viene 
                console.log('CLICKED', image);
                // this.openModalForUmbrella(image);
            });

            image.on('dragend', () => {
                if (this.droppingOnBin) {
                    this.deleteUmbrella(image);
                }
            })

            image.on('dragmove', () => {
                if (this.haveIntersection(this.rectTrashBin.attrs, image.attrs)) {
                    console.log('OVERLAY', image.attrs);
                    this.droppingOnBin = true;
                } else {
                    this.droppingOnBin = false;
                }
            });

        });
    }

    protected async openModalForUmbrella(img: Konva.Image) {
        const opts: ModalOptions = {
            component: UmbrellaModalComponent,
            keyboardClose: true
        };
        const m = await this.mc.create(opts);
        m.present();
    }


    private haveIntersection(r1: Konva.ImageConfig, r2: Konva.ImageConfig) {
        console.log('R1 ANALYSIS', r1);
        return !(
            r2.x > r1.x + (r1.width - 20) ||
            r2.x + r2.width < r1.x ||
            r2.y > r1.y + (r1.height - 20) ||
            r2.y + r2.height < r1.y
        );
    }

    protected prepareZooming(): void {

        this.stage.on('wheel', (e) => {
            e.evt.preventDefault();
            const oldScale = this.stage.scaleX();

            const pointer = this.stage.getPointerPosition();

            const mousePointTo = {
                x: (pointer.x - this.stage.x()) / oldScale,
                y: (pointer.y - this.stage.y()) / oldScale,
            };

            const newScale =
                e.evt.deltaY > 0 ? oldScale * this.scaleBy : oldScale / this.scaleBy;

            this.stage.scale({ x: newScale, y: newScale });

            const newPos = {
                x: pointer.x - mousePointTo.x * newScale,
                y: pointer.y - mousePointTo.y * newScale,
            };
            this.stage.position(newPos);
        });
    }

    protected bootstrapCanvasAndStages(width: number, height: number, globalHeight: number, imageObj: HTMLImageElement): void {

        this.stage = new Konva.Stage({
            container: 'container',
            width,
            height,

        });

        this.mapLayer = new Konva.Layer({
            draggable: true
        });

        this.umbrellaGroup = new Konva.Group({
            width,
            height,
        });

        const rect = new Konva.Rect({
            x: 0,
            y: 0,
            width,
            height: globalHeight,
            fillPatternImage: imageObj,
            //fillPatternOffset: { x : -220, y : 70},
            stroke: 'black',
            strokeWidth: 4,
            fillPatternRepeat: 'no-repeat',
            zIndex: -1 //doesn't work here or in Image object
        });



        // add the shape to the layer
        this.mapLayer.add(rect);
        this.mapLayer.add(this.umbrellaGroup);

        // add the layer to the stage
        this.stage.add(this.mapLayer);

    }

    protected async deleteUmbrella(image: Konva.Image) {
        const a = await this.ac.create({
            header: 'Conferma Azione',
            subHeader: 'Rimuovere Ombrellone?',
            message: `Verrà controllato se ci sono prenotazione attive in futuro per questo ombrellone.`,
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel'
                },
                {
                    text: 'Conferma',
                    handler: () => {
                        image.remove();
                    }
                }
            ]
        });
        a.present();
    }


}