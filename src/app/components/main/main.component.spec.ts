import { HttpClient } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CAT_FACTS_URL, MainComponent } from './main.component';
import { delay, of, tap } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { appRoutes } from 'src/app/app-routing.module';
import { By } from '@angular/platform-browser';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  // Copied from https://angular.io/guide/http#testing-http-requests
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        // Import the http testing module
        HttpClientTestingModule,
        // Import the router testing module
        RouterTestingModule.withRoutes(appRoutes),
      ],
    }).compileComponents();

    // Get the injected instances
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;

    router.navigateByUrl('/');
    flush();

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Http testing: getCatFacts()', () => {
    const CAT_FACTS = 'cat facts';

    describe('using http testing module', () => {
      it('should pass the http cat facts test', () => {
        // Execute the function to test
        component.getCatFacts();

        // // Make an HTTP GET request
        // httpClient.get(CAT_FACTS_URL).subscribe((data) =>
        //   // When observable resolves, result should match test data
        //   expect(data).toBeTruthy()
        // );

        // The following `expectOne()` will match the request's URL.
        // If no requests or multiple requests matched that URL
        // `expectOne()` would throw.
        const req = httpTestingController.expectOne(CAT_FACTS_URL);

        // Assert that the request is a GET.
        expect(req.request.method).toEqual('GET');

        // You can also assert the headers, the body, etc
        // req.request.headers
        // req.request.body

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        req.flush(CAT_FACTS);

        // Finally, assert that there are no outstanding requests.
        httpTestingController.verify();

        expect(component.catFacts).toBe(CAT_FACTS);
      });

      describe('mocking the http get with spy', () => {
        let getSpy: jasmine.Spy;

        beforeEach(() => {
          // Return mock data with the observable
          getSpy = spyOn(httpClient, 'get').and.returnValue(of(CAT_FACTS));
        });

        it('should assign the cat facts', () => {
          component.getCatFacts();
          expect(component.catFacts).toBe(CAT_FACTS);
        });

        it('should set isLoading=true before resolving the http request [with done() function]', (done) => {
          getSpy.and.returnValue(
            of(CAT_FACTS).pipe(
              delay(100),
              tap(() => done())
            )
          );

          component.getCatFacts();

          expect(component.isLoading).toBeTrue();
        });

        it('should set isLoading=true before resolving the http request [with fakeAsync]', fakeAsync(() => {
          getSpy.and.returnValue(of(CAT_FACTS).pipe(delay(100)));

          component.getCatFacts();

          expect(component.isLoading).toBeTrue();

          // Finish async
          tick(100);
        }));

        it('should display loading', fakeAsync(() => {
          getSpy.and.returnValue(of(CAT_FACTS).pipe(delay(100)));

          component.getCatFacts();

          fixture.detectChanges();

          const loadingHtml = fixture.debugElement.query(By.css('#loading'));

          expect(loadingHtml).toBeTruthy();

          // Finish async
          tick(100);
        }));

        it('should hide loading after request completed', fakeAsync(() => {
          getSpy.and.returnValue(of(CAT_FACTS).pipe(delay(100)));

          component.getCatFacts();

          // Finish async
          tick(100);

          fixture.detectChanges();

          const loadingHtml = fixture.debugElement.query(By.css('#loading'));

          expect(component.isLoading).toBeFalse();
          expect(loadingHtml).toBeNull();
        }));
      });
    });
  });

  /**
   * Navigate and check location path. The router seems to navigate asynchronously
   * so it needs fakeAsync to simulate it
   */
  it('should navigate', fakeAsync(() => {
    component.navigateTo();

    flush();
    fixture.detectChanges();

    expect(location.path()).toContain('navigated');
  }));

  /**
   * Spy on the navigate function so it doesn't really navigate;
   * just assert that the method is called
   */
  it('should navigate with spy', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.navigateTo();

    expect(navigateSpy).toHaveBeenCalledWith(['navigated']);
  });
});
