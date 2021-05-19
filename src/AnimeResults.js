const AnimeResults = (props) => {
  
  const {animeArray, pageTitle, searchTitle} = props;
  console.log(animeArray);

	return (
    <div className="wrapper mainContainer">
      <h2 className="pageTitle"> {pageTitle ? `Top 50 anime ${pageTitle}`: searchTitle }</h2>
      <ul className="animeGrid">
            {
                animeArray.map(({ animeName, animeRank, animeImage, animeSynopsis, animeEpisodes }, index) => {
                  return (
                    <li key={index}>
                      <h3>{animeRank ?`Rank# ${animeRank}` :''} {animeName}</h3>
                      <p>{animeEpisodes ? `# of Episodes ${animeEpisodes}`:''}</p>
                      <p>{animeSynopsis ? `${animeSynopsis}`:''}</p>
                      <img src={animeImage} alt={`promotional poster of ${animeName}`} />
                    </li>
                  )
                })
            }
      </ul>
    </div>
	)
}


export default AnimeResults;