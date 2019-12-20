'use strict';

angular.
  module('amplifierResponse').
  component('amplifierResponse', {
    templateUrl: 'amplifier-response/amplifier-response.template.html',
    controller: ['$http', function detectorInterfaceController($http) {
      var self = this;
      self.boards = null;
      self.measurementOptions = [
        {value: 'S12', label: 'S12'},
        {value: 'S21', label: 'S21'},
        {value: 'S22', label: 'S22'}
      ];
      self.measurementSelect = 'S12'
      self.formatOptions = [
        {value: 'comma', label: 'Comma separated'},
        {value: 'line', label: 'New line per value'}
      ];
      self.selectedFormat = 'line'
      self.updateChannelIdOptions = function(boardName) {
        self.channelIdOptions = [{
          label: 'New',
          value: 'new'
        }]
        if (self.boards == null) {
          return;
        }
        if (boardName == null) {
          return;
        }
        for(var i=0; i<self.boards[boardName].channels.length;i++) {
          if (self.boards[boardName].channels[i].S_parameter == self.measurementSelect) {
            self.channelIdOptions.push({
              value: self.boards[boardName].channels[i].id,
              label: self.boards[boardName].channels[i].id
            });
          }
        }
      }
      self.loadAmp = function() {
        if (self.selectedChannelId == 'new') {
          var channelId = self.newChannelId;
        } else {
          var channelId = self.selectedChannelId;
        }

        var params = {
          boardname: self.boards[self.selectedBoardName].name,
          measurement: self.measurementSelect,
          channel: channelId
        }
        console.log(JSON.stringify(params))
        $http.get('/api/getAmpMeasurement/'+JSON.stringify(params)).then(function(reply) {
          var data = reply.data;
          console.log(data);
          self.frequencies = data.frequencies;
          self.amplitude = data.mag;
          self.phase = data.phase
        })
      }
      self.updateChannelIdOptions(0);
      $http.get('/api/getAmpBoards').then(function(reply) {
        self.boardNameOptions = []
        self.boards = reply.data;
        console.log(self.boards)
        for(var i=0;i<self.boards.length;i++) {
          self.boardNameOptions.push({
            value: i,
            label: self.boards[i].name
          });
        }
      });
    }]
  });
