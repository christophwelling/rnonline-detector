'use strict';

angular.
  module('textfieldInput').
  component('textfieldInput', {
    templateUrl: 'textfield-input/textfield-input.template.html',
    bindings:{
      content: '=',
      title: "@",
      separator: '@'
    },
    controller: ['$http', function detectorInterfaceController($http) {
      var self = this;
      self.display = {
        get text() {
          if (self.content == undefined) {
            return "";
          }
          return self.content.join(self.separator);
        },
        set text(newText) {
          self.content = newText.split(self.separator);
        }
      }
      self.isNan = function(string) {
        return isNaN(string);
      }
      self.isValid = function() {
        if (self.content == undefined) {
          return false;
        }
        if (self.content.length == 0) {
          return false;
        }
        var isNan =  self.content.some(self.isNan);
        return !isNan
      }
    }]
  });
