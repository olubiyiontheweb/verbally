import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YarnsPage } from './yarns.page';

describe('YarnsPage', () => {
  let component: YarnsPage;
  let fixture: ComponentFixture<YarnsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YarnsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YarnsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
