import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtualizarPage } from './atualizar.page';

describe('AtualizarPage', () => {
  let component: AtualizarPage;
  let fixture: ComponentFixture<AtualizarPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(AtualizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
