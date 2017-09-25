import app = require('../../app');
import ComponentService = require('../../services/componentService');
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
app.component('panel', new Panel() );

