function load(selector, path) {
  const cached = localStorage.getItem(path);
  if (cached) {
    document.querySelector(selector).innerHTML = cached;
  }

  fetch(path)
    .then((res) => res.text())
    .then((html) => {
      if (html !== cached) {
        document.querySelector(selector).innerHTML = html;
        localStorage.setItem(path, html);
      }
    });
}

function updatePriceRange() {
  // PRICE RANGE
  const rangeInput = document.querySelectorAll(
      ".product__filter--price-jar__slider input"
    ),
    priceInput = document.querySelectorAll(
      ".product__filter--price-jar__limits--field__input input"
    );

  let priceGap = 10;
  let minAllowed = 0;
  let maxAllowed = 150;

  priceInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minLimit = parseFloat(priceInput[0].value),
        maxLimit = parseFloat(priceInput[1].value);

      if (maxLimit - minLimit >= priceGap && maxLimit < 150 && minLimit > 0) {
        if (
          e.target.classList.contains(
            "product__filter--price-jar__limits--field__input--value__min"
          )
        ) {
          rangeInput[0].value = minLimit;
        } else if (
          e.target.classList.contains(
            "product__filter--price-jar__limits--field__input--value__max"
          )
        ) {
          rangeInput[1].value = maxLimit;
        }
      } else if (maxLimit - minLimit < priceGap && maxLimit >= priceGap) {
        if (minLimit > 0 && minLimit < maxLimit && maxLimit < 150) {
          priceInput[1].value = Number(priceInput[0].value) + 10;
        } else {
          minLimit = 0;
          priceInput[0].value = minLimit;
        }
      } else if (maxLimit > maxAllowed) {
        maxLimit = maxAllowed;
        priceInput[1].value = maxLimit;
      } else if (maxLimit < minAllowed || maxLimit < priceGap) {
        priceInput[1].value = priceGap;
        maxLimit = priceInput[1].value;
        priceInput[0].value = 0;
        minLimit = priceInput[0].value;
      } else if (minLimit < minAllowed) {
        priceInput[0].value = 0;
        minLimit = priceInput[0].value;
      }
      rangeInput[0].value = minLimit;
      rangeInput[1].value = maxLimit;
      console.log(minLimit, maxLimit);
      console.log(minLimit.toFixed(2), maxLimit.toFixed(2));
    });
  });

  rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = parseFloat(rangeInput[0].value),
        maxPrice = parseFloat(rangeInput[1].value);

      if (maxPrice - minPrice < priceGap) {
        if (
          e.target.classList.contains(
            "product__filter--price-jar__slider--input__min"
          )
        ) {
          rangeInput[0].value = maxPrice - priceGap;
        } else if (
          e.target.classList.contains(
            "product__filter--price-jar__slider--input__max"
          )
        ) {
          rangeInput[1].value = minPrice + priceGap;
        }
      } else {
        priceInput[0].value = minPrice.toFixed(2);
        priceInput[1].value = maxPrice.toFixed(2);
      }
      console.log(minPrice, maxPrice);
    });
  });
}

function resetSizeValue() {
  const sizeSelect = document.querySelector(
      ".product__filter--sw-jar__box--size-field__select"
    ),
    weightSelect = document.querySelector(
      ".product__filter--sw-jar__box--weight-field__select"
    );

  weightSelect.addEventListener("change", function () {
    sizeSelect.value = "";
  });
}
