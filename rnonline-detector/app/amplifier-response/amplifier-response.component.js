'use strict';

angular.
  module('amplifierResponse').
  component('amplifierResponse', {
    templateUrl: 'amplifier-response/amplifier-response.template.html',
    controller: ['$http', function detectorInterfaceController($http) {
      // --setting up component--
      var self = this;
      self.boards = null;
      self.measurementOptions = [
        {value: 'S12', label: 'S12'},
        {value: 'S21', label: 'S21'},
        {value: 'S22', label: 'S22'}
      ];
      self.measurementSelect = 'S12'
      self.formatOptions = [
        {value: ',', label: 'Comma separated'},
        {value: '\n', label: 'New line per value'}
      ];
      self.selectedFormat = ','
      self.amplitude = [];
      self.frequencies = [];
      self.phase = [];
      // --defining functions--
      self.updateSelections = function() {
        $http.get('/api/getAmpBoards').then(function(reply) {
          self.boardNameOptions = []
          self.boards = reply.data;
          for(var i=0;i<self.boards.length;i++) {
            self.boardNameOptions.push({
              value: i,
              label: self.boards[i].name
            });
          }
          self.updateChannelIdOptions(self.selectedBoardName, self.measurementSelect);
        });
      }
      self.updateSelections();
      self.onBoardChange = function(boardName) {
        self.updateChannelIdOptions(boardName, self.measurementSelect);
      }
      self.onMeasurementChange = function(measurement) {
        self.updateChannelIdOptions(self.selectedBoardName, measurement);
      }
      self.updateChannelIdOptions = function(boardName, measurement) {
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
          if (self.boards[boardName].channels[i].S_parameter == measurement) {
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
        $http.get('/api/getAmpMeasurement/'+JSON.stringify(params)).then(function(reply) {
          var data = reply.data;
          self.frequencies = data.frequencies;
          self.amplitude = data.mag;
          self.phase = data.phase
        })
      }
      self.saveAmp = function() {
        if (self.selectedChannelId == 'new') {
          var channelId = self.newChannelId;
        } else {
          var channelId = self.selectedChannelId;
        }
        var amp = {
          boardname: self.boards[self.selectedBoardName].name,
          measurement: {
            id: channelId,
            S_parameter: self.measurementSelect,
            frequencies: self.frequencies.map(self.convertArrayToNumbers),
            mag: self.amplitude.map(self.convertArrayToNumbers),
            phase: self.phase.map(self.convertArrayToNumbers)
          }
        }
        $http.post('/api/insertAmpMeasurement'+JSON.stringify(amp)).then(function() {
          self.updateSelections();
        });
      }
      self.showLoadButton = function() {
        if (self.measurementSelect == undefined) {
          return false;
        }
        if (self.selectedBoardName == undefined) {
          return false;
        }
        if (self.selectedChannelId == undefined || self.selectedChannelId == 'new') {
          return false;
        }
        return true;
      }
      self.showAmpFormatError = function() {
        if (self.frequencies.length!=self.amplitude.length||self.amplitude.length!=self.phase.length) {
          return true;
        }
        return false;
      }
      self.convertArrayToNumbers = function(element) {
        return Number(element);
      }
    }]
  });
