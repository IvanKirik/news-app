/**
 * Function to compare in product selection.CompareWith in mat-select.
 */
export function compareById(
  productFirst: { id: number },
  productSecond: { id: number },
): boolean {
  return productFirst && productSecond && productFirst.id === productSecond.id;
}
