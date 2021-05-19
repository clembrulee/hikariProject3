import './App.css';
import {useEffect, useState} from 'react'
import Header from './Header.js'
import AnimeResults from './AnimeResults.js'
import Footer from './Footer.js'

function App() {
  console.log(`app is rendering`)
  
  const [animeList, setAnimeList] = useState([]);
  const [category, setCategory] = useState('airing');
  
  useEffect(() => {

    let baseURL ='https://api.jikan.moe/v3/top/anime/1/airing';

    if (category === 'airing'){
      baseURL = `https://api.jikan.moe/v3/top/anime/1/airing`;
    }else if (category === 'upcoming'){
      baseURL = `https://api.jikan.moe/v3/top/anime/1/upcoming`;
    }else if(category === 'tv'){
      baseURL = `https://api.jikan.moe/v3/top/anime/1/tv`;
    }else if(category === 'movie'){
      baseURL = `https://api.jikan.moe/v3/top/anime/1/movie`;
    }

    fetch(baseURL)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        const topAnime = jsonResponse.top.map((result) => {
          return {
            animeName:result.title,
            animeImage:result.image_url,
            animeRank:result.rank
          }
        })
            setAnimeList(topAnime);
      })
  }, [category])
  

  const handleButtonClick = ({ target }) => {
    setCategory(target.id)
  }

  return (
    <div>
      <Header buttonHandler={handleButtonClick}/>
      <main>
          <AnimeResults animeArray={animeList} pageTitle={category}/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
