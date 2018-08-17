import { Item } from './Item';

export class Element {
  name: string;
  item: Item;
}

export class LevelElement {
  [level: string]: Array<Element>
}

