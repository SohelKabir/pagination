import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <div className='container mt-5'>
        <h1 className='text-primary mb-3'>Pagination Challenge</h1>
        <h2 className='text-secondary mb-3'>Timeline</h2>
        <Posts posts={currentPosts} loading={loading} />

        <ReactPaginate
          pageCount={posts.length / 5}
          pageRangeDisplayed={3}
          marginPagesDisplayed={3}
          initialPage={0}
          onPageChange={v => paginate(v.selected + 1)}
          containerClassName={'pagination'}
          pageClassName={'page-link'}
          nextClassName={'page-link'}
          previousClassName={'page-link'}
          activeClassName={'page-item active'}
          disabledClassName={'page-item disabled'}
          breakClassName={'page-link'}
        />
      </div>
    </div>
  );
};

export default App;
