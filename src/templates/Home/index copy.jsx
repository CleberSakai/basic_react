import "./styles.css";

import { useEffect, useState, useCallback } from "react";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/Text Input";
import axios from "axios";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [peoples, setPeoples] = useState([])
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(20);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const getPeoples = async () => {

    try{
      const { data } = await axios.get('http://localhost:3000/peoples')

      setPeoples(data)
    }catch{
      setPeoples([])
    }
  }

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
    getPeoples()
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    // aqui estou definindo quais irão ser os proximos dois posts
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search Value: {searchValue}</h1>}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      <ul>
        <hr />
          {
            peoples.length > 0 ? (
              peoples.map(({
                id,
                first_name,
                last_name,
                age,
                created_at
              }, index) => (
                <>
                  <li>INDEX {index}</li>
                  <li>Id: {id}</li>
                  <li>First Name: {first_name} </li>
                  <li>Last Name: {last_name} </li>
                  <li>Age: {age} </li>
                  <li>Created At: {created_at} </li>
                  <hr />
                </>
              ))
            ) : (
              <h2> Peoples Not Found </h2>
            )
          }
      </ul>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <p>No posts</p>}

      <div className="button-container">
        {!searchValue && (
          <Button
            onClick={loadMorePosts}
            text={"Load More posts"}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};
