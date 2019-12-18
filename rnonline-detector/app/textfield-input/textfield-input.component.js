'use strict';

angular.
  module('textfieldInput').
  component('textfieldInput', {
    templateUrl: 'textfield-input/textfield-input.template.html',
    bindings:{
      content: '=',
      title: "@"
    },
    controller: ['$http', function detectorInterfaceController($http) {
      var self = this;
      var content;
      var title;
    }]
  });
