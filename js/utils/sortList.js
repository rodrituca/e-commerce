const options = {
  ORDER_ASC_BY_NAME: 'AZ',
  ORDER_DESC_BY_NAME: 'ZA',
  ORDER_ASC_BY_PRICE: '12',
  ORDER_DESC_BY_PRICE: '21',
  ORDER_BY_PROD_COUNT: 'Cant.',
  ORDER_BY_RANGE: 'RANGE',
  FILTER: 'SEARCH_FILTER',
  currentCategoriesArray: [],
  currentSortCriteria: undefined,
  minCount: undefined,
  maxCount: undefined,
};

function sortList(criteria, array, opt) {
  let newArray = array.slice(0, array.length);
  let result = [];
  if (criteria === options.ORDER_ASC_BY_NAME) {
    result = newArray.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    // Ordenar por nombre descendiente
  } else if (criteria === options.ORDER_DESC_BY_NAME) {
    result = newArray.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });

    // Ordenar por cantidad de productos
  } else if (criteria === options.ORDER_BY_PROD_COUNT) {
    result = newArray.sort(function (a, b) {
      let aCount = parseInt(a.productCount);
      let bCount = parseInt(b.productCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === options.ORDER_ASC_BY_PRICE) {
    result = newArray.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === options.ORDER_DESC_BY_PRICE) {
    result = newArray.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === options.ORDER_BY_RANGE) {
    const { from, to } = opt.range;
    result = newArray.filter((item) => item.cost >= from && item.cost <= to);
  } else if (criteria === options.FILTER) {
    const { search } = opt;
    console.log(search);
    result = newArray.filter((item) => {
      return item.name.toLowerCase().includes(search);
    });
  }

  return result;
}

export { sortList, options };
