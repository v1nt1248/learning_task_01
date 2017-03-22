/* create v1nt1248 22.03 */

declare namespace test {

  interface Coords {
    x: number;
    y: number;
  }

  interface Size {
    width: number;
    height: number;
  }

  interface Geometric extends Coords, Size {
  }  

  interface Amt {
    column: number;
    row: number;
  }

}
