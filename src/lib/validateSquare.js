const pipelineCheck = arr => {
  let pass = true;
  for (let i = 1; i < arr.length; ++i) {
    if (arr[i] !== arr[i - 1] + 1) {
      pass = false;
      break;
    }
  }

  return pass;
};

const fullRectangleCheck = (rows, cols, localCell, globalCell) => {
  let pass = true;
  let area = 0;
  globalCell
    .filter(cell => {
      if (
        rows[0] <= cell.rows[0] &&
        rows[rows.length - 1] >= cell.rows[cell.rows.length - 1]
      ) {
        if (
          cols[0] <= cell.cols[0] &&
          cols[cols.length - 1] >= cell.cols[cell.cols.length - 1]
        ) {
          return true;
        }
      }
      return false;
    })
    .forEach(cel => {
      area += cel.rows.length * cel.cols.length;
      pass &= localCell.has(cel.id);
    });

  return pass && area === rows.length * cols.length;
};

const sameAreaCheck = (rows, cols, cover) => {
  let rowIndex = 0,
    colIndex = 0,
    prevRow = 0;

  //  check only header & body area
  return cover.rowHeader.some(area => {
    rowIndex += prevRow;
    const areaSpan = area.children.length;
    prevRow += areaSpan;
    return rows.every(row => rowIndex <= row && row < rowIndex + areaSpan);
  });
};

const validateSquare = (clicked, globalCell, cover) => {
  const { rows, cols, cell } = clicked;
  const rowsArr = [...rows.keys()].sort((a, b) => a - b);
  const colsArr = [...cols.keys()].sort((a, b) => a - b);

  return (
    pipelineCheck(rowsArr) &&
    pipelineCheck(colsArr) &&
    fullRectangleCheck(rowsArr, colsArr, cell, globalCell) &&
    sameAreaCheck(rowsArr, colsArr, cover)
  );
};

export default validateSquare;
