import './App.css';
import {useEffect, useState} from 'react'
import Header from './Header.js'
import AnimeResults from './AnimeResults.js'
import Footer from './Footer.js'

function App() {
  // create a state for anime list results to be stored and rendered
  const [animeList, setAnimeList] = useState([]);
  // create category state to change based on user selection
  const [category, setCategory] = useState('airing');
  // create a pageTitle state to change to content on page
  const [pageTitle, setPageTitle]=useState('');

  // side-effect for calling API when button categories are changed
  useEffect(() => {
    let url ='https://api.jikan.moe/v3/top/anime/1/airing';

    if (category === 'airing'){
      url = `https://api.jikan.moe/v3/top/anime/1/airing`;
    }else if (category === 'upcoming'){
      url = `https://api.jikan.moe/v3/top/anime/1/upcoming`;
    }else if(category === 'tv'){
      url = `https://api.jikan.moe/v3/top/anime/1/tv`;
    }else if(category === 'movie'){
      url = `https://api.jikan.moe/v3/top/anime/1/movie`;
    }else if(category === ''){

    }

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        const topAnime = jsonResponse.top.map((result) => {
          // return object parameters for the new array
          return {
            animeName:result.title,
            animeImage:result.image_url,
            animeRank:result.rank
          }
        })
            setAnimeList(topAnime);
      })

  }, [category])
  
  // button handler for clicking 
  const handleButtonClick = ({ target }) => {
    setCategory(target.id)
  }

  // function for returned data from search call
  const onSearchReturned = (searchedResults, searchQuery) => {
    setCategory('');
    setAnimeList(searchedResults);
    setPageTitle(searchQuery);
  }

  return (
    <div>
      <Header buttonHandler={handleButtonClick} onSearchReturned={onSearchReturned}/>
      <main>
          <AnimeResults animeArray={animeList} pageTitle={category} searchTitle={pageTitle}/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
