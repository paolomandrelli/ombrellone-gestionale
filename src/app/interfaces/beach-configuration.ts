import Konva from 'konva';

/**
 * Questa è l'interfaccia che definisce l'oggetto salvato nei services.
 * Fa riferimento ad un ombrellone con un ID determinato, pertanto prima di inserirlo
 * bisogna fare in modo che venga salvato su DB.
 */
export interface BeachConfiguration {
    ombrelloneId: Required<number>;
    imageConfig: Konva.ImageConfig;
}