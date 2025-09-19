import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechMemoryComponent } from './tech-memory.component';

describe('TechMemoryComponent', () => {
  let component: TechMemoryComponent;
  let fixture: ComponentFixture<TechMemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechMemoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
