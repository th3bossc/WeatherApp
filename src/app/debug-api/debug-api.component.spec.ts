import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugApiComponent } from './debug-api.component';

describe('DebugApiComponent', () => {
  let component: DebugApiComponent;
  let fixture: ComponentFixture<DebugApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebugApiComponent]
    });
    fixture = TestBed.createComponent(DebugApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
