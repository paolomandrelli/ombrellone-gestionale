import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OMResponsiveContainerComponent } from './om-responsive-container.component';

describe('ResponsiveContainerComponent', () => {
  let component: OMResponsiveContainerComponent;
  let fixture: ComponentFixture<OMResponsiveContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OMResponsiveContainerComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OMResponsiveContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
