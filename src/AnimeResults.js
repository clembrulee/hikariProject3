const AnimeResults = (props) => {
  
  const {animeArray} = props;
	return (
    <div>
      <ul className="animeGrid">
            {/* li of anime */}
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

export default AnimeResults;