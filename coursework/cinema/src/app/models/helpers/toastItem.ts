export class ToastItem {
  private static nextId = 1;

  public id: number;
  constructor(
    public type: ToastType,
    public title: string,
    public message: string) {
      this.id = ToastItem.nextId++;
  }
}

export type ToastType = 'danger' | 'success' | 'info';
