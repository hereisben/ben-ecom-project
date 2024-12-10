function load(selector, path) {
  const cached = localStorage.getItem(path);
  if (cached) {
    document.querySelector(selector).innerHTML = cached;
    return;
  }

  fetch(path)
    .then((res) => res.text())
    .then((html) => {
      if (html !== cached) {
        document.querySelector(selector).innerHTML = html;
        localStorage.setItem(path, html);
      }
    })
    .catch((err) => console.error("Fetch failed:", err));
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
    });
  });
}

function resetSizeValue() {
  const sizeSelect = document.querySelector(
      ".product__filter--sw-jar__list-box--size-field__select"
    ),
    weightSelect = document.querySelector(
      ".product__filter--sw-jar__list-box--weight-field__select"
    );

  weightSelect.addEventListener("change", function () {
    sizeSelect.value = "";
  });
}

function cancelFilterButton() {
  const filterBox = document.getElementById("product__filter"),
    cancelFilterButton = document.getElementById(
      "product__filter--action__cancel-button"
    ),
    filterTextInputs = document.querySelectorAll(
      ".product__filter--jar .text-input"
    ),
    filterSelects = document.querySelectorAll(
      ".product__filter--sw-jar__list-box--field__select"
    );

  let clickCount = 0;

  cancelFilterButton.addEventListener("click", () => {
    clickCount++;
    if (clickCount === 1) {
      filterTextInputs.forEach((filterTextInput) => {
        filterTextInput.value = "";
      });

      filterSelects.forEach((filterSelect) => {
        filterSelect.value = "";
      });
    } else if (clickCount === 2) {
      let allInputsAreEmpty = true;
      filterTextInputs.forEach((filterTextInput) => {
        if (filterTextInput.value !== "") {
          allInputsAreEmpty = false;
        }
      });

      let allSelectionsAreNotSelected = true;
      filterSelects.forEach((filterSelect) => {
        if (filterSelect.value !== "") {
          allSelectionsAreNotSelected = false;
        }
      });

      if (allInputsAreEmpty && allSelectionsAreNotSelected) {
        filterBox.style.display = "none";
      }

      clickCount = 0;
    }
  });
}

function addItemToCart() {
  const favItems = document.querySelectorAll(".product__item--thumb__checkbox"),
    itemsAdded = document.getElementById("user-nav__btn--data");

  let itemsCount = 0;
  favItems.forEach((favItem) => {
    favItem.addEventListener("change", () => {
      if (favItem.checked) {
        itemsCount++;
      } else {
        itemsCount--;
      }
      itemsAdded.innerHTML = String(itemsCount).padStart(2, "0");
    });
  });
}

function hideShowSearchBtn() {
  const button = document.querySelector(".topbar__search--btn"),
    searchInput = document.querySelector(".topbar__search--input"),
    searchIcon = document.querySelector(".search-icon"),
    cancelIcon = document.querySelector(".cancel-icon"),
    topbarNav = document.querySelector(".topbar__nav"),
    departmentDropdown = document.querySelector("#department-dropdown"),
    groceryDropdown = document.querySelector("#grocery-dropdown"),
    beautyDropdown = document.querySelector("#beauty-dropdown"),
    dropdownVector = document.querySelector("#dropdown-vector");

  button.addEventListener("click", function () {
    if (searchInput.style.display === "block") {
      searchInput.style.display = "none";
      searchIcon.style.display = "block";
      cancelIcon.style.display = "none";
      topbarNav.style.marginLeft = "14.4rem";
    } else {
      searchInput.style.display = "block";
      searchIcon.style.display = "none";
      cancelIcon.style.display = "block";
      if (window.innerWidth < 1399.98 && window.innerWidth >= 1200) {
        topbarNav.style.marginLeft = "4.8rem";
      }
    }
  });
}
