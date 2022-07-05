function getPage(totalItems, current) {
  let startPage, endPage;
  let totalPages = Math.ceil(totalItems / 10);

  if (current < 1) {
    current = 1;
  } else if (current > totalPages) {
    current = totalPages;
  }

  if (totalPages <= 5) {
    // less than 5 total pages so show all
    startPage = 1;
    endPage = totalPages;
  } else {
    // more than 5 total pages so calculate start and end pages
    if (current < 5) {
      startPage = 1;
      endPage = 5;
    } else if (current + 2 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = current - 1;
      endPage = current + 1;
    }
  }

  let pages = Array.from(new Array(endPage + 1 - startPage).keys()).map(
    (i) => startPage + i
  );

  let test = [];

  if (totalPages >= 5) {
    test = [...pages, '...'];
  } else {
    test = pages;
  }

  if (current >= 5 && current < endPage) {
    test = ['...', ...pages, '...'];
  } else if (current === endPage) {
    test = ['...', ...pages];
  }

  // console.log({ startPage, endPage, current, totalPages, pages, test });

  return {
    pages: test,
    currentPage: current || 1,
  };
}

export default getPage;
