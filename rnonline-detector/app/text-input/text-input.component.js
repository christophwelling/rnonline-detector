'use strict';

angular.
  module('textInput').
  component('textInput', {
    templateUrl: 'text-input/text-input.template.html',
    bindings: {
      value: '=',
      label: '@',
      type: '@',
      maxDigits: '@',
      minDigits: '@'
    },
    controller: ['$http', function detectorInterfaceController($http) {
      var self = this;
      self.invalid = function() {
        if (self.value == undefined ) {
          return true;
        }
        if (self.type == 'id') {
          if (isNaN(self.value)) {
            return true;
          }
          if(!Number.isInteger(Number(self.value))) {
            return true;
          }
          if(self.value<0) {
            return true;
          }
          if(self.value.includes('.')) {
            return true;
          }
        }
        if (self.maxDigits != undefined) {
          if (self.value.length > self.maxDigits) {
            return true;
          }
        }
        if (self.minDigits != undefined) {
          console.log('!');
          console.log(self.value.length)
          console.log(self.minDigits)
          if (self.value.length < self.minDigits) {
            return true;
          }
        }
      }
    }]
  });
