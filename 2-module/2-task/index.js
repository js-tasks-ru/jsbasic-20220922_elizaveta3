function isEmpty(obj) {
  for (let prop in obj) {
    return !(prop in obj);
  }

  return true;
}
