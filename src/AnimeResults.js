// Create animeresults component
const AnimeResults = (props) => {

  // destructure props from App.js
  const {animeArray, pageTitle, searchTitle} = props;
  const animeText = document.querySelectorAll(`li p`)
  
  // needed padding styles for text that only generates from the search results
  if(!pageTitle){
    animeText.forEach((text) => {
      text.classList.add('animeTextPadding')
    })
  }else{
    animeText.forEach((text) => {
      text.classList.remove('animeTextPadding')
    })
  }
  

  // render results to page
	return (
    <div className="wrapper mainContainer">
      <h2 className="pageTitle"> {pageTitle ? `Top 25 anime ${pageTitle}`: `Search results for "${searchTitle}"` }</h2>
      <ul className="animeGrid">
            {
                animeArray.map(({ animeName, animeRank, animeImage, animeSynopsis, animeEpisodes }, index) => {
                  return (
                    <li key={index}>
                        <h3>{animeRank ?`Rank# ${animeRank}` :''} {animeName}</h3>
                        <img src={animeImage} alt={`promotional poster of ${animeName}`} />
                        <div className="animeInfo">
                          <p>{animeEpisodes ? `# of Episodes ${animeEpisodes}`:''}</p>
                          <p>{animeSynopsis ? `${animeSynopsis}`:''}</p>
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