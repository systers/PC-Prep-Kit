import { Item } from './models/Item';
import { BackgroundElement, ManElement, PositionElement } from './models/elements';

export const BackgroundConfig: BackgroundElement = {
  imageURL: '/assets/img/strides-against/background.jpg',
  imageX: 0,
  imageY: 0,
  imageWidth: 800,
  imageHeight: 450,
  foreObjectsCount: 5
};

export const ManConfig: ManElement = {
  imageURL: '/assets/img/strides-against/man.svg',
  imageX: 90,
  imageY: 92,
  imageWidth: 25,
  imageHeight: 50,
};
export const ObjectsConfig: Array<Item> = [
  {
    name: 'Garlic',
    index: 0,
    element: {
      imageURL: '/assets/img/strides-against/garlic.png',
      messageImageURL: '/assets/img/strides-against/messages/garlic.jpg',
      messageBody: 'It\'s just a myth, consuming Garlic to prevent Malaria does not work.',

      imageWidth: 40,
      imageHeight: 40,
      question: 'Consuming Garlic, helps prevent Malaria.',
      answer: false,
    }
  }, {
    name: 'RepellentCream',
    index: 1,
    element: {
      imageURL: '/assets/img/strides-against/cream.png',
      messageImageURL: '/assets/img/strides-against/messages/cream.png',
      messageBody: ' Applying Mosquito repellent cream/spray help a lot.',

      imageWidth: 40,
      imageHeight: 40,
      question: 'Applying Mosquito Repellent Cream helps prevent Malaria.',
      answer: true,
    }
  }, {
    name: 'AirCondition',
    index: 2,
    element: {
      imageURL: '/assets/img/strides-against/air-conditioner.png',
      messageImageURL: '/assets/img/strides-against/messages/air-conditioned.png',
      messageBody: 'Staying in dry and air conditioned surroundings do help a lot',

      imageWidth: 40,
      imageHeight: 30,
      question: 'Staying in dry air conditioned surroundings helps prevent Malaria.',
      answer: true,
    }
  }, {
    name: 'Clothes',
    index: 3,
    element: {
      imageURL: '/assets/img/strides-against/clothes.png',
      messageImageURL: '/assets/img/strides-against/messages/clothes.jpg',
      messageBody: 'Always wear full shirts/pants to avoid bites by mosquitoes',

      imageWidth: 40,
      imageHeight: 40,
      question: 'Wearing full sleeved clothes helps prevent Malaria.',
      answer: true,
    }
  }, {
    name: 'Homeopathy',
    index: 4,
    element: {
      imageURL: '/assets/img/strides-against/homeopathy.png',
      messageImageURL: '/assets/img/strides-against/messages/homeopathy.jpg',
      messageBody: 'It\'s just a myth. Scientifically not proven. ',

      imageWidth: 40,
      imageHeight: 40,
      question: 'Consuming Homeopathy medicines help prevent Malaria',
      answer: false,
    }
  }, {
    name: 'Yeast',
    index: 5,
    element: {
      imageURL: '/assets/img/strides-against/yeast.png',
      messageImageURL: '/assets/img/strides-against/messages/yeast.jpg',
      messageBody: 'It\'s just a myth. It does not help ',

      imageWidth: 40,
      imageHeight: 40,
      question: 'Consuming Yeast Extract helps prevent Malaria',
      answer: false,
    }
  },
];
export const positionConfig: Array<PositionElement> = [
  {
    index: 0,
    positionIndex: 3,
    position: {
      imageX: 253,
      imageY: 100,
    }
  },
  {
    index: 1,
    positionIndex: 5,
    position: {
      imageX: 425,
      imageY: 100,
    }
  },
  {
    index: 2,
    positionIndex: 10,
    position: {
      imageX: 592,
      imageY: 190,
    }
  },
  {
    index: 3,
    positionIndex: 13,
    position: {
      imageX: 334,
      imageY: 190,
    }
  },
  {
    index: 4,
    positionIndex: 15,
    position: {
      imageX: 166,
      imageY: 195,
    }
  },
  {
    index: 5,
    positionIndex: 20,
    position: {
      imageX: 340,
      imageY: 290,
    }
  },
  {
    index: 6,
    positionIndex: 22,
    position: {
      imageX: 511,
      imageY: 290,
    }
  },
  {
    index: 7,
    positionIndex: 28,
    position: {
      imageX: 425,
      imageY: 380,
    }
  },
  {
    index: 8,
    positionIndex: 30,
    position: {
      imageX: 253,
      imageY: 380,
    }
  }
];


