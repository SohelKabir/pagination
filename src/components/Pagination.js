import React from 'react';

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  setCurrentPage,
  currentPage,
  indexOfFirstPost,
  indexOfLastPost,
  currentPosts,
  setPostsPerPage
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const totalPage = totalPosts / postsPerPage;
  const c1 = currentPage - 2;
  const c2 = currentPage + 2;
  let pageNumbers2 = pageNumbers;
  if (currentPage > totalPage / 2) {
    pageNumbers2 = pageNumbers.slice(c1, c2);
  } else {
    pageNumbers2 = pageNumbers.slice(0, c2);
  }

  return (
    <nav>
      <ul className='pagination'>
        <button onClick={() => paginate(1)} className='page-link'>
          First
        </button>
        <button onClick={() => paginate(currentPage--)} className='page-link'>
          Prev
        </button>
        {pageNumbers2.map(number => (
          <li key={number} className='page-item'>
            <a
              onClick={() => paginate(number)}
              href='!#'
              className='btn btn-link btn-sm active'
            >
              {
                //number.slice(c1, c2);
                number
              }
            </a>
          </li>
        ))}
        <button onClick={() => paginate(currentPage++)} className='page-link'>
          Next
        </button>
        <button
          onClick={() => paginate(totalPosts / postsPerPage)}
          className='page-link'
        >
          Last
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;
