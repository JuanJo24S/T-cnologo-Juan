import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerAssemblyComponent } from './computer-assembly.component';

describe('ComputerAssemblyComponent', () => {
  let component: ComputerAssemblyComponent;
  let fixture: ComponentFixture<ComputerAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputerAssemblyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputerAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
