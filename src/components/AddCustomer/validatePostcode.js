function validatePostcode(postcode) {
  postcode = postcode.replace(/\s/g, '');
  var regex = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;
  return regex.test(postcode);
}

export { validatePostcode };
