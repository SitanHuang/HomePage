function isWorkday() {
  const today = moment().day();

  return today >= 1 && today <= 5;
}