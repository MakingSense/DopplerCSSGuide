import app = require('../app');
class ComponentService {

  constructor (private $http: ng.IHttpService) {
  }

  public createComponent (name: string): ng.IPromise< any > {
    return this.$http.post('http://localhost:9200/dopplercssstyleguide/component/', {
        name : name
      })
      .then((response: any) => {
        return response.data;
      });
  }

  public getComponents (): ng.IPromise< any > {
    return this.$http.get('http://localhost:9200/dopplercssstyleguide/component/_search')
      .then((response: any) => {
        return response.data.hits.hits;
      });
  }

  public getComponent (id: number): ng.IPromise< any > {
    return this.$http.get('http://localhost:9200/dopplercssstyleguide/component/' + id)
      .then((response: any) => {
        return response.data;
      });
  }

}

export = ComponentService;

app.service('componentService', ComponentService);
