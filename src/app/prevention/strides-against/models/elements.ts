export class Elements {
  imageURL: string;
  messageImageURL: string;
  messageBody: string;
  imageWidth: number;
  imageHeight: number;
  question: string;
  answer: boolean;
}

export class BackgroundElement {
  imageURL: string;
  imageX: number;
  imageY: number;
  imageWidth: number;
  imageHeight: number;
  foreObjectsCount: number;
}

export class ManElement {
  imageURL: string;
  imageX: number;
  imageY: number;
  imageWidth: number;
  imageHeight: number;
}

export class Position {
  imageX: number;
  imageY: number;
}

export class PositionElement {
  index: number;
  positionIndex: number;
  position: Position
}

