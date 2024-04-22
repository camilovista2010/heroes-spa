import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component'; 
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router'; 
import { SearchHeroesComponent } from 'src/app/dashboard/components/search-heroes/search-heroes.component'; 
import { HttpClient } from '@angular/common/http';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let location: Location;
  let router: Router;
  let dialog: MatDialog; 

  beforeAll(async () => { 

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    dialog = TestBed.get(MatDialog); 

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 

  it('should not change hasHistory if navigated to dashboard URL', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    const events = new NavigationEnd(1, '/dashboard', '/login'); 
    tick();
    expect(component.hasHistory).toBeFalse();
  }));

  it('should call location.back() when goBack is called', () => {
    spyOn(location, 'back');
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });
 
});
