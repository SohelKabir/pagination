import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  let [postsPerPage, setPostsPerPage] = useState(10);

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
  const totalPosts = posts.length;

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  //Setting Posts Per page
  const settingPostsNum = num => {
    setPostsPerPage(num);
  };
  //handling page search
  const handleInput = value => {
    setSearchInput(value);
  };

  const handleSearchOnClick = () => {
    paginate(searchInput);
  };

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>Pagination Challenge</h1>
      <h2 className='text-secondary mb-3'>Timeline</h2>
      <Posts posts={currentPosts} loading={loading} />

      <Dropdown>
        <Dropdown.Toggle variant='success' id='dropdown-basic'>
          Posts Per Page
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => settingPostsNum(5)}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => settingPostsNum(10)}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => settingPostsNum(20)}>20</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <p>
        Showing page {currentPage} of {Math.ceil(totalPosts / postsPerPage)}
      </p>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        indexOfLastPost={indexOfLastPost}
        indexOfFirstPost={indexOfFirstPost}
        currentPosts={currentPosts}
        setPostsPerPage={setPostsPerPage}
      />
      <div class='btn-group'>
        <input
          type='text'
          class='form-control'
          placeholder='Enter page number'
          onChange={event => handleInput(event.target.value)}
        />
        <span class='input-group-addon'>{}</span>
        <Button
          onClick={() => handleSearchOnClick()}
          variant='primary'
          type='submit'
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default App;
