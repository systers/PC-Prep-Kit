import { Elements } from './elements';

export class Item {
  index: number;
  name: string;
  element: Elements;
}

export class LevelItems {
  [level: string]: Array<Item>
}
