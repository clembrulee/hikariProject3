// import components
import './App.css';
import { useEffect, useState } from 'react'
import Header from './Header.js'
import AnimeResults from './AnimeResults.js'
import Footer from './Footer.js'


function App() {
  // create a state for anime list results to be stored and rendered
  const [animeList, setAnimeList] = useState([]);
  // create category state to change based on user selection
  const [category, setCategory] = useState('airing');
  // create a pageTitle state to change to content on page
  const [pageTitle, setPageTitle] = useState('Currently Airing');


  // side-effect for calling API when button categories are changed
  useEffect(() => {
    if (!category) {
      return
    }


    let url = `https://api.jikan.moe/v4/top/anime?sfw=true&filter=${category}`;


    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {

        return response.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
        const topAnime = jsonResponse.data.map((result) => {
          
          // return object parameters for the new array
          return {
            animeName: result.title,
            animeImage: result.images.jpg.image_url,
            animeRank: result.rank,
            animeSynopsis:result.synopsis
          }
        })
        setAnimeList(topAnime);
      })

  }, [category])

  // button handler for clicking 
  const handleButtonClick = ({ target }) => {
    if (target.id === 'airing') {
      setCategory(target.id)
      setPageTitle('Currently Airing')
    } else if (target.id === 'bypopularity') {
      setCategory(target.id)
      setPageTitle('By Popularity')
    } else {
      setCategory('airing')
    }

  }

  // function for returned data from search call
  const onSearchReturned = (searchedResults, searchQuery) => {
    setCategory('');
    setAnimeList(searchedResults);
    setPageTitle(searchQuery);
  }

  // handler for returning to initial page
  const handleTitleClick = (() => {
    setCategory('airing');
  })

  // Render onto page
  return (
    <div>
      <Header handleTitleClick={handleTitleClick} buttonHandler={handleButtonClick} onSearchReturned={onSearchReturned} />
      <main>
        <AnimeResults animeArray={animeList} pageTitle={pageTitle} searchTitle={pageTitle} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
