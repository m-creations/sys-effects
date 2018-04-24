// (c) 2018 m-creations GmbH - All rights reserved

/**
 * @class Service which interacts with the backend for retrieving and
 * storing system effects.
 *
 */

export default class SysEffectsService {

  constructor(/* AppConstants, $http */) {
    'ngInject';
 
    // no http call yet
    // this.AppConstants = AppConstants;
    // this.$http = $http;

    // Object to store the retrieved effects (maybe we'll need to cache)
    this.current = null;
  }

  // mock the retrieval of effects from backend
  retrieveEffects() {
    return  new Promise(function(resolve, reject) {
      resolve({
        sysEffects: [
          {
            title: 'System Effect 01',
            notes: 'System Effect 01',
            related_effects: []
          },
          {
            title: 'System Effect 02',
            notes: 'System Effect 02',
            related_effects: []
          },
          {
            title: 'System Effect 03',
            notes: 'System Effect 03',
            related_effects: []
          },
          {
            title: 'System Effect 04',
            notes: 'System Effect 04',
            related_effects: []
          },
          {
            title: 'System Effect 05',
            notes: 'System Effect 05',
            related_effects: []
          },
          {
            title: 'System Effect 06',
            notes: 'System Effect 06',
            related_effects: []
          },
          {
            title: 'System Effect 07',
            notes: 'System Effect 07',
            related_effects: []
          },
          {
            title: 'System Effect 08',
            notes: 'System Effect 08',
            related_effects: []
          },
          {
            title: 'System Effect 09',
            notes: 'System Effect 09',
            related_effects: []
          },
          {
            title: 'System Effect 10',
            notes: 'System Effect 10',
            related_effects: []
          },
          {
            title: 'System Effect 11',
            notes: 'System Effect 11',
            related_effects: []
          },
          {
            title: 'System Effect 12',
            notes: 'System Effect 12',
            related_effects: []
          },
          {
            title: 'System Effect 13',
            notes: 'System Effect 13',
            related_effects: []
          },
          {
            title: 'System Effect 14',
            notes: 'System Effect 14',
            related_effects: []
          },
          {
            title: 'System Effect 15',
            notes: 'System Effect 15',
            related_effects: []
          },
          {
            title: 'System Effect 16',
            notes: 'System Effect 16',
            related_effects: []
          },
          {
            title: 'System Effect 17',
            notes: 'System Effect 17',
            related_effects: []
          },
          {
            title: 'System Effect 18',
            notes: 'System Effect 18',
            related_effects: []
          },
          {
            title: 'System Effect 19',
            notes: 'System Effect 19',
            related_effects: []
          },
          {
            title: 'System Effect 20',
            notes: 'System Effect 20',
            related_effects: []
          },
          {
            title: 'System Effect 21',
            notes: 'System Effect 21',
            related_effects: []
          },
          {
            title: 'System Effect 22',
            notes: 'System Effect 22',
            related_effects: []
          },
          {
            title: 'System Effect 23',
            notes: 'System Effect 23',
            related_effects: []
          },
          {
            title: 'System Effect 24',
            notes: 'System Effect 24',
            related_effects: []
          },
          {
            title: 'System Effect 25',
            notes: 'System Effect 25',
            related_effects: []
          },
          {
            title: 'System Effect 26',
            notes: 'System Effect 26',
            related_effects: []
          },
          {
            title: 'System Effect 27',
            notes: 'System Effect 27',
            related_effects: []
          },
          {
            title: 'System Effect 28',
            notes: 'System Effect 28',
            related_effects: []
          },
          {
            title: 'System Effect 29',
            notes: 'System Effect 29',
            related_effects: []
          },
          {
            title: 'System Effect 30',
            notes: 'System Effect 30',
            related_effects: []
          },
        ],
        plantEffects: [
          {
            title: 'Plant Effect 01',
            notes: 'Plant Effect 01',
            related_effects: []
          },
          {
            title: 'Plant Effect 02',
            notes: 'Plant Effect 02',
            related_effects: []
          },
          {
            title: 'Plant Effect 03',
            notes: 'Plant Effect 03',
            related_effects: []
          },
          {
            title: 'Plant Effect 04',
            notes: 'Plant Effect 04',
            related_effects: []
          },
          {
            title: 'Plant Effect 05',
            notes: 'Plant Effect 05',
            related_effects: []
          },
          {
            title: 'Plant Effect 06',
            notes: 'Plant Effect 06',
            related_effects: []
          },
          {
            title: 'Plant Effect 07',
            notes: 'Plant Effect 07',
            related_effects: []
          },
          {
            title: 'Plant Effect 08',
            notes: 'Plant Effect 08',
            related_effects: []
          },
          {
            title: 'Plant Effect 09',
            notes: 'Plant Effect 09',
            related_effects: []
          },
          {
            title: 'Plant Effect 10',
            notes: 'Plant Effect 10',
            related_effects: []
          },
          {
            title: 'Plant Effect 11',
            notes: 'Plant Effect 11',
            related_effects: []
          },
          {
            title: 'Plant Effect 12',
            notes: 'Plant Effect 12',
            related_effects: []
          },
          {
            title: 'Plant Effect 13',
            notes: 'Plant Effect 13',
            related_effects: []
          },
          {
            title: 'Plant Effect 14',
            notes: 'Plant Effect 14',
            related_effects: []
          },
          {
            title: 'Plant Effect 15',
            notes: 'Plant Effect 15',
            related_effects: []
          },
          {
            title: 'Plant Effect 16',
            notes: 'Plant Effect 16',
            related_effects: []
          },
          {
            title: 'Plant Effect 17',
            notes: 'Plant Effect 17',
            related_effects: []
          },
          {
            title: 'Plant Effect 18',
            notes: 'Plant Effect 18',
            related_effects: []
          },
          {
            title: 'Plant Effect 19',
            notes: 'Plant Effect 19',
            related_effects: []
          },
          {
            title: 'Plant Effect 20',
            notes: 'Plant Effect 20',
            related_effects: []
          },
          {
            title: 'Plant Effect 21',
            notes: 'Plant Effect 21',
            related_effects: []
          },
          {
            title: 'Plant Effect 22',
            notes: 'Plant Effect 22',
            related_effects: []
          },
          {
            title: 'Plant Effect 23',
            notes: 'Plant Effect 23',
            related_effects: []
          },
          {
            title: 'Plant Effect 24',
            notes: 'Plant Effect 24',
            related_effects: []
          },
          {
            title: 'Plant Effect 25',
            notes: 'Plant Effect 25',
            related_effects: []
          },
          {
            title: 'Plant Effect 26',
            notes: 'Plant Effect 26',
            related_effects: []
          },
          {
            title: 'Plant Effect 27',
            notes: 'Plant Effect 27',
            related_effects: []
          },
          {
            title: 'Plant Effect 28',
            notes: 'Plant Effect 28',
            related_effects: []
          },
          {
            title: 'Plant Effect 29',
            notes: 'Plant Effect 29',
            related_effects: []
          },
          {
            title: 'Plant Effect 30',
            notes: 'Plant Effect 30',
            related_effects: []
          }
        ]
      });
    });
  }
}

