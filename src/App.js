import './App.css';
import {useEffect, useState} from 'react'
// import Header from './Header.js'
// import Search from './Search.js'
import AnimeResults from './AnimeResults.js'
import Footer from './Footer.js'

function App() {
  console.log(`app is rendering`)
  
  const [animeList, setAnimeList] = useState([]);
  const [category, setCategory] = useState('airing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnime, setSelectedAnime] = useState([]);

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


  useEffect(() => {
    let searchURL = new URL('https://api.jikan.moe/v3/search/anime?')

    const searchParams = new URLSearchParams(
      {
        q: searchQuery,
        order_by: "title",
        sort: "desc"
      }
    );

    searchURL.search = searchParams
    console.log(`Fetching ${searchURL}`)
    fetch(searchURL)
      .then((response) => {
        // console.log(response)
        return response.json();
      }).then((jsonResponse) => {
        console.log(jsonResponse)
        const searchResults = jsonResponse.results.map((result) => {
          return {
            animeAiring: result.airing,
            animeImage: result.image_url,
            animeEpisodes: result.episodes,
            animeSynopsis: result.synopsis,
            animeName: result.title
          }
        })
        console.log(searchResults)
        // setSelectedAnime(searchResults);
      })

  }, [selectedAnime])



  const handleButtonClick = ({ target }) => {
    if (target.id === 'airingButton') {
      setCategory('airing');
    } else if (target.id === 'upcomingButton') {
      setCategory('upcoming');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSelectedAnime("")
  }
    
  const handleUserSearch = (event) => {
    let inputValue = event.target.value
    setSearchQuery(inputValue);
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
          <form onSubmit={handleSubmit} className="searchBar">
            <label htmlFor="search" className="srOnly">Search for an anime for more info</label>
            <input
              id="search"
              name="search"
              type="text"
              autoComplete="off"
              placeholder="Search an anime for more info"
              minLength="3"
              value={searchQuery}
              onChange={handleUserSearch}
            />
            <button id="submitButton" className="submitButton" type="submit">Submit</button>
          </form>
        </div>
      </header>
      <main>
        <div className="wrapper mainContainer">
          <h2 className="pageTitle">Top 50 {category} anime </h2>
          <AnimeResults animeArray={animeList} searchResultsArray={selectedAnime}/>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
