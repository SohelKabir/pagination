import React from 'react';
import Pagination2 from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';

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
  // setPostsPerPage = 4

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const prev = () => {};

  return (
    <nav>
      <ul className='pagination'>
        <button onClick={() => paginate(1)} className='page-link'>
          First
        </button>
        <button onClick={() => paginate(currentPage--)} className='page-link'>
          Prev
        </button>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a
              onClick={() => paginate(number)}
              href='!#'
              className='btn btn-link btn-sm active'
            >
              {number}
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
