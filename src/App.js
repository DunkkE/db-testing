import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import {Button} from 'react-bootstrap'
import axios from 'axios'


const dbURL = 'http://localhost:3030/testAPI/articles'
function App() {

  const [articles, setArticles] = useState([])
  const callAPI = () => {
    axios.get(dbURL).then((res) => {
      console.log(res)
      setArticles(res.data)
    })
  }

  const getSpecificArticle = (article) => {
    axios.get(dbURL + '/' + article._id).then((res) => {
      console.log(res)
    })
  }

  const deleteArticle = (article) => {
    axios.delete(dbURL + '/' + article._id).then((res) => {
      if(res.status == 204)
      {
        setArticles(articles.filter((art) => art._id !== article._id))
      }
    })
    
  }
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => callAPI()}>Call the API</Button>
        <p>
          {articles !== undefined && articles.map((article) => (
            <div onClick={() => getSpecificArticle(article)} style={{outlineStyle:'solid', backgroundColor:'slategray', color:'black'}}>
          <Button style={{float:'right'}} onClick={() => deleteArticle(article)}>X</Button>
          <p>
            {article.title}, {article.author}
          </p>
          
          <p>
            {article.body}
          </p>
          
          </div>
          ))}
        </p>
      </header>
    </div>
  );
}

export default App;
