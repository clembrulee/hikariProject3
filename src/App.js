import './App.css';
import {useEffect, useState} from 'react'
// import AnimeArray from './AnimeArray'

function App() {
  console.log(`app is rendering`)
  
  const [animeList, setAnimeList] = useState([]);
  const [category, setCategory] = useState([]);


  useEffect(() => {
    console.log(`fetching data side-effect`)
    
    let baseURL ='https://api.jikan.moe/v3/top/anime/1/airing';
    if (category === 'airing'){
      baseURL = `https://api.jikan.moe/v3/top/anime/1/airing`;
    }else if (category === 'upcoming'){
      baseURL = `https://api.jikan.moe/v3/top/anime/1/upcoming`;
    }

    console.log(`Fetching ${baseURL}...`)
    fetch(baseURL)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse.top)
        const topAnime = jsonResponse.top.map((results) => {
          return {
            animeName:results.title,
            animeImage:results.image_url,
            animeRank:results.rank
          }
        })
        console.log(topAnime)
        
            setAnimeList(topAnime);
      })

  }, [category])

  const handleAiringClick = () => {
    console.log('Airing is clicked');
    setCategory('airing');
  }

  const handleUpcomingClick = () => {
    console.log('Upcoming is clicked');
    setCategory('upcoming');
  }

  return (
    <div>
      <header>
        <div className="wrapper headerContainer">
          <div className="nav">
            <h1>Hikari</h1>
            {/* <h2></h2> */}
            <button onClick={handleAiringClick} >Top Currently Airing </button>
            <button onClick={handleUpcomingClick}>Most Anticipated Upcoming</button>
            <button>Season</button>
          </div>
          <div className="searchBar">
            <label htmlFor="search" className="srOnly">Search for an anime</label>
            <input id="search" name="search" type="text" autocomplete="off" placeholder="Search for an anime"/>
            <button id="submitButton" className="submitButton">Submit</button>
          </div>
        </div>
        
      </header>
      <main>
        <div className="wrapper mainContainer">
          <h2 className="pageTitle">Top 50 </h2>
          <ul className="animeGrid">
            {/* li of anime */}
            {
            animeList.map((anime, index) => {
                return (
                  <li key={index}>
                    <h3>Rank#{anime.animeRank} {anime.animeName}</h3>
                    <img src={anime.animeImage} alt={anime.animeName} />
                  </li>
                )
              })
            }
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
