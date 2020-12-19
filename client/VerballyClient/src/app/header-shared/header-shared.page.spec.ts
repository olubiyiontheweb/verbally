import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeaderSharedPage } from './header-shared.page';

describe('HeaderSharedPage', () => {
  let component: HeaderSharedPage;
  let fixture: ComponentFixture<HeaderSharedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSharedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderSharedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
