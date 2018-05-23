import { Item } from './models/Item';
import { Element } from './models/Element';

// For the background of the game

export const backgroundConfig: Item = {
  imageURL: '../../../assets/img/stop-the-breed/background2.png',
  positionX: 0,
  positionY: 0,
  width: 800,
  height: 425,
  messageText: '',
  messageImageURL: '../../../assets/img/stop-the-breed/background2.png'
};

// For the elements that user can select in the game

export const elementConfig: Array<Element> = [{
  name: 'Bottle',
  item: {
    imageURL: '../../../assets/img/stop-the-breed/wall4.png',
    positionX: 200,
    positionY: 200,
    width: 30,
    height: 60,
    messageText: 'They are potential breeding grounds for Mosquitoes. ' +
      'Do look for them in your surroundings and remove them.',
    messageImageURL: '../../../assets/img/stop-the-breed/message/bottle.jpg'
  }
}, {
  name: 'Bowl',
  item: {
    imageURL: '../../../assets/img/stop-the-breed/bowl.png',
    positionX: 250,
    positionY: 250,
    width: 60,
    height: 90,
    messageText: 'They are potential breeding grounds for Mosquitoes. ' +
      'Do look for them in your surroundings and remove them.',
    messageImageURL: '../../../assets/img/stop-the-breed/message/bowl.jpeg'
  }
}, {
  name: 'Tyre',
  item: {
    imageURL: '../../../assets/img/stop-the-breed/tyre.png',
    positionX: 675,
    positionY: 350,
    width: 40,
    height: 60,
    messageText: 'They are potential breeding grounds for Mosquitoes. ' +
      'Do look for them in your surroundings and remove them.',
    messageImageURL: '../../../assets/img/stop-the-breed/message/tyre.jpg'
  }
}, {
  name: 'Shoe',
  item: {
    imageURL: '../../../assets/img/stop-the-breed/shoes.png',
    positionX: 570,
    positionY: 230,
    width: 40,
    height: 60,
    messageText: 'They are potential breeding grounds for Mosquitoes. ' +
      'Do look for them in your surroundings and remove them.',
    messageImageURL: '../../../assets/img/stop-the-breed/message/shoes.jpg'
  }
}, {
  name: 'Barrel',
  item: {
    imageURL: '../../../assets/img/stop-the-breed/barrel.png',
    positionX: 385,
    positionY: 260,
    width: 80,
    height: 120,
    messageText: 'They are potential breeding grounds for Mosquitoes. ' +
      'Do look for them in your surroundings and remove them.',
    messageImageURL: '../../../assets/img/stop-the-breed/message/barrel.jpg'
  }
},
];
