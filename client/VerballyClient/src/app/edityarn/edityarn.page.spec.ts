import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EdityarnPage } from './edityarn.page';

describe('EdityarnPage', () => {
  let component: EdityarnPage;
  let fixture: ComponentFixture<EdityarnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdityarnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EdityarnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
