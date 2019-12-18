'use strict';

angular.
  module('amplifierResponse').
  component('amplifierResponse', {
    templateUrl: 'amplifier-response/amplifier-response.template.html',
    controller: ['mongodb', function detectorInterfaceController(mongodb) {
      var self = this;
      console.log(mongodb)
      self.measurementOptions = [
        {value: 'S12', label: 'S12'},
        {value: 'S21', label: 'S21'},
        {value: 'S22', label: 'S22'}
      ];
      self.formatOptions = [
        {value: 'comma', label: 'Comma separated'},
        {value: 'line', label: 'New line per value'}
      ];
    }]
  });
