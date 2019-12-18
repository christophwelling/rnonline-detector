'use strict';

angular.
  module('dropdownSelect').
  component('dropdownSelect', {
    templateUrl: 'dropdown-select/dropdown-select.template.html',
    bindings: {
      options: '<',
      selected: '=',
      label: '@'
    },
    controller: ['$http', function detectorInterfaceController($http) {
      var self = this;
      var options;
      var selected;
    }]
  });
