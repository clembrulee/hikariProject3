// Create animeresults component
const AnimeResults = (props) => {

  // destructure props from App.js
  const { animeArray, pageTitle, searchTitle } = props;
  const animeText = document.querySelectorAll(`li p`)
  console.log(animeArray);
  
  // needed padding styles for text that only generates from the search results
  if (!pageTitle) {
    animeText.forEach((text) => {
      text.classList.add('animeTextPadding')
    })
  } else {
    animeText.forEach((text) => {
      text.classList.remove('animeTextPadding')
    })
  }


  // render results to page
  return (
    <div className="wrapper mainContainer">
      <h2 className="pageTitle"> {pageTitle ? `Top 25 anime ${pageTitle}` : `Search results for "${searchTitle}"`}</h2>
      <ul className="animeGrid">
        {
          animeArray.map(({ animeName, animeRank, animeImage, animeSynopsis, animeEpisodes, }, index) => {
            return (
              <li key={index}>
                {/* <h3>{animeRank ? `Rank# ${animeRank}` : ''} {animeName}</h3> */}
                <h3>{animeName}</h3>
                <a href="#animeInfo"><img src={animeImage} alt={`promotional poster of ${animeName}`} /></a>
                <div id="animeInfo" className="animeInfo">
                  {/* <p>{animeStatus ? `${animeStatus}` : ''}</p> */}
                  <p>{animeEpisodes ? `# of Episodes ${animeEpisodes}` : ''}</p>
                  <p>{animeSynopsis ? `${animeSynopsis}` : ''}</p>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}


export default AnimeResults;