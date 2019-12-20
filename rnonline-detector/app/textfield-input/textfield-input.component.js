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
      var content;
      var title;
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
    }]
  });
