'use strict';

angular.
  module('dropdownSelect').
  component('dropdownSelect', {
    templateUrl: 'dropdown-select/dropdown-select.template.html',
    bindings: {
      options: '<',
      selected: '=',
      label: '@',
      change: '<?'
    },
    controller: ['$http', function detectorInterfaceController($http) {
      var self = this;
    }]
  });
