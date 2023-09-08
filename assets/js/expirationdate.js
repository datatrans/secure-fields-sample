function formatExpirationDate (val) {
  var p1 = parseInt(val[0], 10),
    p2 = parseInt(val[1], 10);

  return /^\d$/.test(val) && "0" !== val && "1" !== val
    ? "0" + val + " / "
    : /^\d\d$/.test(val)
      ? p2 > 2 && 0 !== p1 ? "0" + p1 + " / " + p2 : "" + val + " / "
      : val
}

function handleExpirationDate(element, focusOnFilled) {
  ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'].forEach(function (key) {
    element.addEventListener(key, function (e) {
      if (/^\d+$/.test(e.key)) {
        this.value = formatExpirationDate(this.value);
      }

      if (/^\d{0,2}[\/]?\d{0,2}/.test(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty('oldValue')) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = '';
      }
      if (this.oldSelectionEnd === 7 && key === 'keyup' && e.key.match(/^[0-9]$/)) {
        secureFields.focus(focusOnFilled);
      }
    });
  });
}

function getExpirationDateObject (value) {
  var split = value.split('/')
  expm = split[0].trim();
  expy = split[1].trim();

  return {
    expm: expm,
    expy: expy
  };
}
