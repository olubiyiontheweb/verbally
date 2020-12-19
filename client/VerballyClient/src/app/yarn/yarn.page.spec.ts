import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YarnPage } from './yarn.page';

describe('YarnPage', () => {
  let component: YarnPage;
  let fixture: ComponentFixture<YarnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YarnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YarnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
