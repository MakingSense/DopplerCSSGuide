import ComponentService from '../../services/componentService';

interface IMainController {
  component: Component;
  componentName: string;
  getComponent (): void;
  createComponent (): void;
}

class MainController implements IMainController {
  public component: Component;
  public componentName: string;

  constructor (private componentService: ComponentService) {
    this.componentName = '';
  }

  public getComponent (): void {
    this.componentService.getComponent(this.component._id)
      .then((response: any): void => {
        this.component = response;
      });
  }

  public createComponent (): void {
    this.componentService.createComponent(this.componentName)
      .then((response: any): void => {
        this.component = response;
      });
  }

}

class Main implements ng.IComponentOptions {
  public controller: any;
  public templateUrl: string;

  constructor () {
    this.controller = MainController;
    this.templateUrl = require('./main.html');
  }

}

export default Main;


