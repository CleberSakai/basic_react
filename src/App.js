import "./App.css";
import { Component } from "react";

class App extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    //Aqui estou carregando tudo definido em loadPosts
    this.loadPosts();
  }

  loadPosts = async () => {
    // Aqui estou pegando os dados de uma "APi" atraves do fetch
    const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");

    const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");

    // Aqui estou esperando a resposta da "API" na Promise
    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    // Aqui estou pegando a resposta "posts" e trasformando em um Json
    const postsJson = await posts.json();
    const photosJson = await photos.json();

    //Aqui estou definindo que quero a mesma quantidade de posts e fotos, já que tenho 5000 fotos e 100 posts
    // Fazendo mapeando e retornando um novo array com posts e fotos unidas
    // Para cada post estou pegando um indice de fotos, no caso sua URL
    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url };
    });

    // Aqui estou colocando um estado
    this.setState({ posts: postsAndPhotos });
  };

  render() {
    const { posts } = this.state;

    return (
      <section className="container">
        <div className="posts">
          {posts.map((post) => (
            <div className="post">
              <img src={post.cover} alt={post.title}></img>
              <div key={post.id} className="post-content">
                <h1>{post.title}</h1>
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default App;
