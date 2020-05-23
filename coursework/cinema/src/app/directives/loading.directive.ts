import { Directive, TemplateRef, ViewContainerRef, Input, ComponentRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { LoaderComponent } from '../components/loader/loader.component';

@Directive({
  selector: '[appLoading]',
})
export class LoadingDirective {

  private loaderFactory: ComponentFactory<LoaderComponent>;
  private loaderComponent: ComponentRef<LoaderComponent>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private componentFactoryResolver: ComponentFactoryResolver,

  ) {
    this.loaderFactory = this.componentFactoryResolver.resolveComponentFactory(LoaderComponent);
  }

  @Input() set appLoading(isLoading: boolean) {
    this.viewContainerRef.clear();
    if (isLoading) {
      this.loaderComponent = this.viewContainerRef.createComponent(this.loaderFactory);
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

}
