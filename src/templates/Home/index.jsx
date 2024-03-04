import "./styles.css";

import { Component } from "react";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 53,
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;

    const nextPage = page + postsPerPage;
    // aqui estou definindo quais irão ser os proximos dois posts
    const nexPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nexPosts);

    this.setState({ posts, page: nextPage });
  };

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    // definindo o limite para alterar o estado do button
    const noMorePosts = page + postsPerPage >= allPosts.length;

    return (
      <section className="container">
        <Posts posts={posts} />

        <div className="button-container">
          <Button
            //isso aqui não é um evento, sim um atributo que vai chegar como props do meu componente
            onClick={this.loadMorePosts}
            text={"Load More posts"}
            disabled={noMorePosts}
          />
        </div>
      </section>
    );
  }
}
