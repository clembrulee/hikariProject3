import './App.css';
import {useEffect, useState} from 'react'
// import Header from './Header.js'
import Search from './Search.js'
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
    if (target.id === 'airingButton') {
      setCategory('airing');
    } else if (target.id === 'upcomingButton') {
      setCategory('upcoming');
    }
  }

  return (
    <div>
      <header>
        <div className="wrapper headerContainer">
          <div className="nav">
            <div className="titleText">
              <h1>Hikari</h1>
              <h2>Find your next anime to watch!</h2>
            </div>
            <div className="navButtons">
              <button onClick={handleButtonClick} id="airingButton">Top Currently Airing </button>
              <button onClick={handleButtonClick} id="upcomingButton">Most Anticipated Upcoming</button>
            </div>
          </div>
          <Search />
        </div>
      </header>
      <main>
        <div className="wrapper mainContainer">
          <h2 className="pageTitle">Top 50 {category} anime </h2>
          <AnimeResults animeArray={animeList} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
