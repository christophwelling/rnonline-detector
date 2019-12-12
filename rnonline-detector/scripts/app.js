angular.module('rnonline', [])
  .controller('rnonlineController', function() {
    var rnonline = this;
    rnonline.stationID = 32
    rnonline.stations = [];
    rnonline.editMode = false;
    rnonline.showDetector = function() {
      console.log(dummyDetector.stations);
    }
    rnonline.updateDetector = function() {
      rnonline.stations = [];
        console.log(Object.keys(dummyDetector.stations))
        //for (var i=0; i<Object.keys(dummyDetector.stations).length; i++) {
        for (key in dummyDetector.stations) {
          var station = dummyDetector.stations[key];
          if (station.station_id == rnonline.stationID) {
            rnonline.stations.push(station);
          }
        }
        console.log(rnonline.stations)
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
