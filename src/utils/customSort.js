export const customSort = (rows, selector, direction) => {
  return rows.sort((rowA, rowB) => {
    const aField = selector(rowA);
    const bField = selector(rowB);

    let comparison = 0;

    if (aField > bField) {
      comparison = 1;
    } else if (aField < bField) {
      comparison = -1;
    }

    return direction === 'desc' ? comparison * -1 : comparison;
  });
};
