function makeDiagonalRed(table) {
  for (let i = 0; i < table.rows.length; i++) {
    let result = table.rows[i].cells[i];
    result.style.backgroundColor = "red";
  }
}
