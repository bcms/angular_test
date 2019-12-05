import { async, TestBed, ComponentFixture } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginDialogComponent } from './dialog/login-dialog/login-dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let modalService: NgbModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        LoginDialogComponent
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        NgbModule,
        HttpClientTestingModule
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [LoginDialogComponent] }
      })
      .overrideComponent(LoginDialogComponent, {
        set: {
          selector: 'app-login-dialog',
          template: '<p>Login Dialog</p>'
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    modalService = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openLoginDialog() should open the dialog', () => {
    let modalService_openSpy = spyOn(modalService, 'open').and.callThrough()

    component.openLoginDialog();
    expect(modalService_openSpy).toHaveBeenCalledWith(LoginDialogComponent);
  });
});