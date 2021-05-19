const AnimeResults = (props) => {
  
  const {animeArray, pageTitle} = props;
	return (
    <div className="wrapper mainContainer">
      <h2 className="pageTitle">Top 50 anime {pageTitle} </h2>
      <ul className="animeGrid">
            {
              animeArray.map(({animeName,animeRank, animeImage}, index) => {
                return (
                  <li key={index}>
                    <h3>Rank#{animeRank} {animeName}</h3>
                    <img src={animeImage} alt={`promotional poster of ${animeName}`} />
                  </li>
                )
              })
            }
      </ul>
    </div>
	)
}

<div className="animeResultsListContainer">
  <ul>
    
  </ul>
</div>

export default AnimeResults;