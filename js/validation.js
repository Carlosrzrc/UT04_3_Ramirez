function showFeedBack(input, valid, message) {
    let validClass = (valid) ? 'is-valid' : 'is-invalid';
    let div = (valid) ? input.nextAll("div.validfeedback") : input.nextAll("div.invalid-feedback");
    input.nextAll('div').removeClass('d-block');
    div.removeClass('d-none').addClass('d-block');
    input.removeClass('is-valid is-invalid').addClass(validClass);
    if (message) {
        div.empty();
        div.append(message);
    }
}
function defaultCheckElement(event) {
    this.value = this.value.trim();
    if (!this.checkValidity()) {
        showFeedBack($(this), false);
    } else {
        showFeedBack($(this), true);
    }
}

function newCategoryValidation(handler) {
    let form = document.forms.fNewCategory;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
      let isValid = true;
      let firstInvalidElement = null;
      this.ncDescription.value = this.ncDescription.value.trim();
      showFeedBack($(this.ncDescription), true);
      if (!this.ncTitle.checkValidity()) {
        isValid = false;
        showFeedBack($(this.ncTitle), false);
        firstInvalidElement = this.ncTitle;
      } else {
        showFeedBack($(this.ncTitle), true);
      }
      if (!this.ncDescription.checkValidity()) {
        isValid = false;
        showFeedBack($(this.ncDescription), false);
        firstInvalidElement = this.ncDescription;
      } else {
        showFeedBack($(this.ncDescription), true);
      }
      if (!isValid) {
        firstInvalidElement.focus();
      } else {
        handler(this.ncTitle.value, this.ncDescription.value);
      }
      event.preventDefault();
      event.stopPropagation();
    });
    form.addEventListener('reset', (function (event) {
      let feedDivs = $(this).find('div.valid-feedback, div.invalidfeedback');
      feedDivs.removeClass('d-block').addClass('d-none');
      let inputs = $(this).find('input');
      inputs.removeClass('is-valid is-invalid');
    }));
    $(form.ncTitle).change(defaultCheckElement);
  }

  function newStoreValidation(handler) {
    let form = document.forms.fNewStore;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
      let isValid = true;
      let firstInvalidElement = null;
      this.address.value = this.address.value.trim();
      showFeedBack($(this.address), true);
      if (!this.CIF.checkValidity()) {
        isValid = false;
        showFeedBack($(this.CIF), false);
        firstInvalidElement = this.CIF;
      } else {
        showFeedBack($(this.CIF), true);
      }
      if (!this.name.checkValidity()) {
        isValid = false;
        showFeedBack($(this.name), false);
        firstInvalidElement = this.name;
      } else {
        showFeedBack($(this.name), true);
      }
      if (!this.coords.checkValidity()) {
        isValid = false;
        showFeedBack($(this.coords), false);
        firstInvalidElement = this.coords;
      } else {
        showFeedBack($(this.coords), true);
      }
      if (!this.tlf.checkValidity()) {
        isValid = false;
        showFeedBack($(this.tlf), false);
        firstInvalidElement = this.tlf;
      } else {
        showFeedBack($(this.tlf), true);
      }

      if (!isValid) {
        firstInvalidElement.focus();
      } else {
        handler(this.CIF.value, this.name.value, this.address.value , this.tlf.value, this.coords.value);
      }
      event.preventDefault();
      event.stopPropagation();
    });
    form.addEventListener('reset', (function (event) {
      let feedDivs = $(this).find('div.valid-feedback, div.invalidfeedback');
      feedDivs.removeClass('d-block').addClass('d-none');
      let inputs = $(this).find('input');
      inputs.removeClass('is-valid is-invalid');
    }));
    $(form.CIF).change(defaultCheckElement);
    $(form.name).change(defaultCheckElement);
    $(form.tlf).change(defaultCheckElement);
    $(form.coords).change(defaultCheckElement);
  }

export { defaultCheckElement , newCategoryValidation , newStoreValidation} ;