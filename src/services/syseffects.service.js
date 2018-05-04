// (c) 2018 m-creations GmbH - All rights reserved

/**
 * @class Service which interacts with the backend for retrieving and
 * storing system effects.
 *
 */

export default class SysEffectsService {

  constructor(/* AppConstants,*/ $http) {
    'ngInject';
 
    // no http call yet
    // this.AppConstants = AppConstants;
    this.$http = $http;

    // Object to store the retrieved effects (maybe we'll need to cache)
    this.current = null;
  }

  // mock the retrieval of effects from backend
  retrieveEffects() {
    var current = this.current;
    return  new Promise(function(resolve, reject) {
      resolve(current = {
        sysEffects: [
          {
            id: 'sys01',
            type: 'sys',
            title: 'System Effect 01',
            notes: 'System Effect 01',
            related_effects: [
              {
                id: 'plant02',
                type: 'plant',
                title: 'Plant Effect 02',
                notes: 'Plant Effect 02',
                related_effects: []
              }
            ]
          },
          {
            id: 'sys02',
            type: 'sys',
            title: 'System Effect 02',
            notes: 'System Effect 02',
            related_effects: [
              {
                id: 'plant02',
                type: 'plant',
                title: 'Plant Effect 02',
                notes: 'Plant Effect 02',
                related_effects: []
              }
            ]
          },
          {
            id: 'sys03',
            type: 'sys',
            title: 'System Effect 03',
            notes: 'System Effect 03',
            related_effects: []
          },
          {
            id: 'sys04',
            type: 'sys',
            title: 'System Effect 04',
            notes: 'System Effect 04',
            related_effects: []
          },
          {
            id: 'sys05',
            type: 'sys',
            title: 'System Effect 05',
            notes: 'System Effect 05',
            related_effects: []
          },
          {
            id: 'sys06',
            type: 'sys',
            title: 'System Effect 06',
            notes: 'System Effect 06',
            related_effects: []
          },
          {
            id: 'sys07',
            type: 'sys',
            title: 'System Effect 07',
            notes: 'System Effect 07',
            related_effects: []
          },
          {
            id: 'sys08',
            type: 'sys',
            title: 'System Effect 08',
            notes: 'System Effect 08',
            related_effects: []
          },
          {
            id: 'sys09',
            type: 'sys',
            title: 'System Effect 09',
            notes: 'System Effect 09',
            related_effects: []
          },
          {
            id: 'sys10',
            type: 'sys',
            title: 'System Effect 10',
            notes: 'System Effect 10',
            related_effects: []
          },
          {
            id: 'sys11',
            type: 'sys',
            title: 'System Effect 11',
            notes: 'System Effect 11',
            related_effects: []
          },
          {
            id: 'sys12',
            type: 'sys',
            title: 'System Effect 12',
            notes: 'System Effect 12',
            related_effects: []
          },
          {
            id: 'sys13',
            type: 'sys',
            title: 'System Effect 13',
            notes: 'System Effect 13',
            related_effects: []
          },
          {
            id: 'sys14',
            type: 'sys',
            title: 'System Effect 14',
            notes: 'System Effect 14',
            related_effects: []
          },
          {
            id: 'sys15',
            type: 'sys',
            title: 'System Effect 15',
            notes: 'System Effect 15',
            related_effects: []
          },
          {
            id: 'sys16',
            type: 'sys',
            title: 'System Effect 16',
            notes: 'System Effect 16',
            related_effects: []
          },
          {
            id: 'sys17',
            type: 'sys',
            title: 'System Effect 17',
            notes: 'System Effect 17',
            related_effects: []
          },
          {
            id: 'sys18',
            type: 'sys',
            title: 'System Effect 18',
            notes: 'System Effect 18',
            related_effects: []
          },
          {
            id: 'sys19',
            type: 'sys',
            title: 'System Effect 19',
            notes: 'System Effect 19',
            related_effects: []
          },
          {
            id: 'sys20',
            type: 'sys',
            title: 'System Effect 20',
            notes: 'System Effect 20',
            related_effects: []
          },
          {
            id: 'sys21',
            type: 'sys',
            title: 'System Effect 21',
            notes: 'System Effect 21',
            related_effects: []
          },
          {
            id: 'sys22',
            type: 'sys',
            title: 'System Effect 22',
            notes: 'System Effect 22',
            related_effects: []
          },
          {
            id: 'sys23',
            type: 'sys',
            title: 'System Effect 23',
            notes: 'System Effect 23',
            related_effects: []
          },
          {
            id: 'sys24',
            type: 'sys',
            title: 'System Effect 24',
            notes: 'System Effect 24',
            related_effects: []
          },
          {
            id: 'sys25',
            type: 'sys',
            title: 'System Effect 25',
            notes: 'System Effect 25',
            related_effects: []
          },
          {
            id: 'sys26',
            type: 'sys',
            title: 'System Effect 26',
            notes: 'System Effect 26',
            related_effects: []
          },
          {
            id: 'sys27',
            type: 'sys',
            title: 'System Effect 27',
            notes: 'System Effect 27',
            related_effects: []
          },
          {
            id: 'sys28',
            type: 'sys',
            title: 'System Effect 28',
            notes: 'System Effect 28',
            related_effects: []
          },
          {
            id: 'sys29',
            type: 'sys',
            title: 'System Effect 29',
            notes: 'System Effect 29',
            related_effects: []
          },
          {
            id: 'sys30',
            type: 'sys',
            title: 'System Effect 30',
            notes: 'System Effect 30',
            related_effects: []
          },
        ],
        plantEffects: [
          {
            id: 'plant01',
            type: 'plant',
            title: 'Plant Effect 01',
            notes: 'Plant Effect 01',
            related_effects: []
          },
          {
            id: 'plant02',
            type: 'plant',
            title: 'Plant Effect 02',
            notes: 'Plant Effect 02',
            related_effects: []
          },
          {
            id: 'plant03',
            type: 'plant',
            title: 'Plant Effect 03',
            notes: 'Plant Effect 03',
            related_effects: []
          },
          {
            id: 'plant04',
            type: 'plant',
            title: 'Plant Effect 04',
            notes: 'Plant Effect 04',
            related_effects: []
          },
          {
            id: 'plant05',
            type: 'plant',
            title: 'Plant Effect 05',
            notes: 'Plant Effect 05',
            related_effects: []
          },
          {
            id: 'plant06',
            type: 'plant',
            title: 'Plant Effect 06',
            notes: 'Plant Effect 06',
            related_effects: []
          },
          {
            id: 'plant07',
            type: 'plant',
            title: 'Plant Effect 07',
            notes: 'Plant Effect 07',
            related_effects: []
          },
          {
            id: 'plant08',
            type: 'plant',
            title: 'Plant Effect 08',
            notes: 'Plant Effect 08',
            related_effects: []
          },
          {
            id: 'plant09',
            type: 'plant',
            title: 'Plant Effect 09',
            notes: 'Plant Effect 09',
            related_effects: []
          },
          {
            id: 'plant10',
            type: 'plant',
            title: 'Plant Effect 10',
            notes: 'Plant Effect 10',
            related_effects: []
          },
          {
            id: 'plant11',
            type: 'plant',
            title: 'Plant Effect 11',
            notes: 'Plant Effect 11',
            related_effects: []
          },
          {
            id: 'plant12',
            type: 'plant',
            title: 'Plant Effect 12',
            notes: 'Plant Effect 12',
            related_effects: []
          },
          {
            id: 'plant13',
            type: 'plant',
            title: 'Plant Effect 13',
            notes: 'Plant Effect 13',
            related_effects: []
          },
          {
            id: 'plant14',
            type: 'plant',
            title: 'Plant Effect 14',
            notes: 'Plant Effect 14',
            related_effects: []
          },
          {
            id: 'plant15',
            type: 'plant',
            title: 'Plant Effect 15',
            notes: 'Plant Effect 15',
            related_effects: []
          },
          {
            id: 'plant16',
            type: 'plant',
            title: 'Plant Effect 16',
            notes: 'Plant Effect 16',
            related_effects: []
          },
          {
            id: 'plant17',
            type: 'plant',
            title: 'Plant Effect 17',
            notes: 'Plant Effect 17',
            related_effects: []
          },
          {
            id: 'plant18',
            type: 'plant',
            title: 'Plant Effect 18',
            notes: 'Plant Effect 18',
            related_effects: []
          },
          {
            id: 'plant19',
            type: 'plant',
            title: 'Plant Effect 19',
            notes: 'Plant Effect 19',
            related_effects: []
          },
          {
            id: 'plant20',
            type: 'plant',
            title: 'Plant Effect 20',
            notes: 'Plant Effect 20',
            related_effects: []
          },
          {
            id: 'plant21',
            type: 'plant',
            title: 'Plant Effect 21',
            notes: 'Plant Effect 21',
            related_effects: []
          },
          {
            id: 'plant22',
            type: 'plant',
            title: 'Plant Effect 22',
            notes: 'Plant Effect 22',
            related_effects: []
          },
          {
            id: 'plant23',
            type: 'plant',
            title: 'Plant Effect 23',
            notes: 'Plant Effect 23',
            related_effects: []
          },
          {
            id: 'plant24',
            type: 'plant',
            title: 'Plant Effect 24',
            notes: 'Plant Effect 24',
            related_effects: []
          },
          {
            id: 'plant25',
            type: 'plant',
            title: 'Plant Effect 25',
            notes: 'Plant Effect 25',
            related_effects: []
          },
          {
            id: 'plant26',
            type: 'plant',
            title: 'Plant Effect 26',
            notes: 'Plant Effect 26',
            related_effects: []
          },
          {
            id: 'plant27',
            type: 'plant',
            title: 'Plant Effect 27',
            notes: 'Plant Effect 27',
            related_effects: []
          },
          {
            id: 'plant28',
            type: 'plant',
            title: 'Plant Effect 28',
            notes: 'Plant Effect 28',
            related_effects: []
          },
          {
            id: 'plant29',
            type: 'plant',
            title: 'Plant Effect 29',
            notes: 'Plant Effect 29',
            related_effects: []
          },
          {
            id: 'plant30',
            type: 'plant',
            title: 'Plant Effect 30',
            notes: 'Plant Effect 30',
            related_effects: []
          }
        ]
      });
    });
  }
}

