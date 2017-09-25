import ComponentService from '../../services/componentService';
class PanelController {
  public components: Component[];

  constructor (private componentService: ComponentService) {
    componentService.getComponents()
      .then((response: any): void => {
        this.components = response;
      });
  }
}

class Panel implements ng.IComponentOptions {
  public controller: any;
  public templateUrl: string;

  constructor () {
    this.controller = PanelController;
    this.templateUrl = 'panel.html';
  }
}
 export default Panel;

