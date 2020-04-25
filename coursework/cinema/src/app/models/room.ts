export class RoomState {
  roomId: string;
  date: Date;
  sittings: Sitting[];
}

export class Sitting {
  price: number;
  row: number;
  number: number;
}
