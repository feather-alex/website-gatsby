export class Numbers {
  /**
   * Given an integer, pad it with zeros to the left.
   *
   * @param value  The number to pad
   * @param width  The total width that the resulting string should be after zero-padding
   */
  public static zeroPad(value: number, width: number) {
    let numberString: string = value.toString();

    if (numberString.length >= width) {
      return numberString;
    }

    numberString = new Array(width - numberString.length + 1).join("0") + value;

    return numberString;
  }

  public static toDecimal(value: number, precision = 2) {
    return parseFloat(value.toFixed(precision));
  }
}
