const AnimeResults = (props) => {
  
  const {animeArray, pageTitle, searchTitle} = props;
  console.log(animeArray);

	return (
    <div className="wrapper mainContainer">
      <h2 className="pageTitle"> {pageTitle ? `Top 50 anime ${pageTitle}`: `Search results for ${searchTitle}` }</h2>
      <ul className="animeGrid">
            {
                animeArray.map(({ animeName, animeRank, animeImage, animeSynopsis, animeEpisodes }, index) => {
                  return (
                    <li key={index}>
                        <h3>{animeRank ?`Rank# ${animeRank}` :''} {animeName}</h3>
                        <img src={animeImage} alt={`promotional poster of ${animeName}`} />
                        <p>{animeEpisodes ? `# of Episodes ${animeEpisodes}`:''}</p>
                        <p>{animeSynopsis ? `${animeSynopsis}`:''}</p>
                    </li>
                  )
                })
            }
      </ul>
    </div>
	)
}


export default AnimeResults;