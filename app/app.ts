import * as angular from 'angular';
import Main from './components/main/main';
import Panel from './components/panel/panel';
import ComponentService from './services/componentService';

let app = angular.module('dopplerCssGuideApp', []);

app.component('main', new Main());
app.component('panel', new Panel() );
app.service('componentService', ComponentService);
