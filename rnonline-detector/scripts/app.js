angular.module('rnonline', [])
  .controller('rnonlineController', function() {
    var rnonline = this;
    rnonline.stationID = 32
    rnonline.stations = [];
    rnonline.editMode = false;
    rnonline.updateDetector = function() {
      rnonline.stations = [];
        for (key in dummyDetector.stations) {
          var station = dummyDetector.stations[key];
          if (station.station_id == rnonline.stationID) {
            rnonline.stations.push(station);
          }
        }
    }

    rnonline.getStations = function() {
      return rnonline.stations;
    }
    rnonline.toggleEdit = function() {
      rnonline.editMode = !rnonline.editMode;
    }
    rnonline.saveStation = function() {
      alert('Lets pretend we just sent the changes to the database');
    }
  });
