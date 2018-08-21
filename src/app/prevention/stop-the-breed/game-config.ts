import { Item } from './models/Item';
import { LevelElement } from './models/Element';

// For the background of the game

export const backgroundConfig = {
  level1: {
    imageURL: '/assets/img/stop-the-breed/background_level1.png',
    positionX: 0,
    positionY: 0,
    width: 800,
    height: 425,
  },
  level2: {
    imageURL: '/assets/img/stop-the-breed/background_level2.jpg',
    positionX: 0,
    positionY: 0,
    width: 826,
    height: 550,
  }
};

// For the elements that user can select in the game

export const elementConfig: LevelElement = {
    level1: [{
      name: 'Bottle',
      item: {
        imageURL: '/assets/img/stop-the-breed/bottle.png',
        positionX: 200,
        positionY: 180,
        width: 20,
        height: 30,
        messageText: 'They are potential breeding grounds for Mosquitoes. ' +
          'Do look for them in your surroundings and remove them.',
        messageImageURL: '/assets/img/stop-the-breed/message/bottle.jpg'
      }
    }, {
      name: 'Bowl',
      item: {
        imageURL: '/assets/img/stop-the-breed/bowl.png',
        positionX: 30,
        positionY: 150,
        width: 30,
        height: 30,
        messageText: 'They are potential breeding grounds for Mosquitoes. ' +
          'Do look for them in your surroundings and remove them.',
        messageImageURL: '/assets/img/stop-the-breed/message/bowl.jpeg'
      }
    }, {
      name: 'Tyres',
      item: {
        imageURL: '/assets/img/stop-the-breed/tyre.png',
        positionX: 695,
        positionY: 325,
        width: 60,
        height: 90,
        messageText: 'They are potential breeding grounds for Mosquitoes. ' +
          'Do look for them in your surroundings and remove them.',
        messageImageURL: '/assets/img/stop-the-breed/message/tyre.jpg'
      }
    }, {
      name: 'Shoe',
      item: {
        imageURL: '/assets/img/stop-the-breed/shoe.png',
        positionX: 460,
        positionY: 205,
        width: 20,
        height: 30,
        messageText: 'They are potential breeding grounds for Mosquitoes. ' +
          'Do look for them in your surroundings and remove them.',
        messageImageURL: '/assets/img/stop-the-breed/message/shoes.jpg'
      }
    }, {
      name: 'Barrel',
      item: {
        imageURL: '/assets/img/stop-the-breed/barrel.png',
        positionX: 385,
        positionY: 260,
        width: 90,
        height: 135,
        messageText: 'They are potential breeding grounds for Mosquitoes. ' +
          'Do look for them in your surroundings and remove them.',
        messageImageURL: '/assets/img/stop-the-breed/message/barrel.jpg'
      }
    },
    ],
  level2: [{
      name: 'Weeds',
      item: {
        imageURL: '/assets/img/stop-the-breed/weed.png',
        positionX: 230,
        positionY: 240,
        width: 80,
        height: 90,
        messageText: 'They are potential breeding grounds for Mosquitoes. ' +
          'Do look for them in your surroundings and remove them.',
        messageImageURL: '/assets/img/stop-the-breed/message/weed.jpg'
      }
    }, {
      name: 'Bowl',
      item: {
        imageURL: '/assets/img/stop-the-breed/bowl.png',
        positionX: 430,
        positionY: 290,
        width: 60,
        height: 30,
        messageText: 'They are potential breeding grounds for Mosquitoes. ' +
          'Do look for them in your surroundings and remove them.',
        messageImageURL: '/assets/img/stop-the-breed/message/bowl.jpeg'
      }
    }, {
      name: 'Tyres',
      item: {
        imageURL: '/assets/img/stop-the-breed/tyre.png',
        positionX: 5,
        positionY: 310,
        width: 30,
        height: 45,
        messageText: 'They are potential breeding grounds for Mosquitoes. ' +
          'Do look for them in your surroundings and remove them.',
        messageImageURL: '/assets/img/stop-the-breed/message/tyre.jpg'
      }
    }, {
      name: 'Shoe',
      item: {
        imageURL: '/assets/img/stop-the-breed/shoe.png',
        positionX: 520,
        positionY: 410,
        width: 40,
        height: 60,
        messageText: 'They are potential breeding grounds for Mosquitoes. ' +
          'Do look for them in your surroundings and remove them.',
        messageImageURL: '/assets/img/stop-the-breed/message/shoes.jpg'
      }
    }, {
      name: 'Tub',
      item: {
        imageURL: '/assets/img/stop-the-breed/tub.png',
        positionX: 270,
        positionY: 130,
        width: 80,
        height: 30,
        messageText: 'They are potential breeding grounds for Mosquitoes. ' +
          'Do look for them in your surroundings and remove them.',
        messageImageURL: '/assets/img/stop-the-breed/message/tub.jpeg'
      }
    },
    ]
  };
