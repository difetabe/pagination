export class Button {
  constructor(label, isSelected, isDots) {
    this.label = label;
    // this.action = typeof action == 'function' ? action : () => {};
    this.isSelected = isSelected;
    this.isDots = isDots;
  }
}
