export interface ItemDescriptor {
  x: number;
  y: number;
  draggable?: boolean;
}

export type ItemsCollectionDescriptor = string | ItemDescriptor[];
