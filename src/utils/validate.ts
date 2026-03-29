export function validatenull(val: any): boolean {
  if (val instanceof Date || typeof val === 'boolean' || typeof val === 'number') {
    return false;
  }

  if (Array.isArray(val)) {
    return val.length === 0;
  }

  if (val instanceof Object) {
    for (const key in val) {
      return false;
    }
    return true;
  }

  return (
    val === 'null' ||
    val == null ||
    val === 'undefined' ||
    val === ''
  );
}
