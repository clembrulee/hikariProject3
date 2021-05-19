import {useState, useEffect} from 'react'

const Search = (props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedAnime, setSelectedAnime] = useState([]);

	useEffect(() => {
		let searchURL = new URL('https://api.jikan.moe/v3/search/anime?')

		const searchParams = new URLSearchParams(
			{
				q: searchQuery,
				order_by: "title",
				sort: "asc",
				rating: "pg13",
				limit: 50
			}
		);

		searchURL.search = searchParams
		fetch(searchURL)
			.then((response) => {
				return response.json();
			}).then((jsonResponse) => {
				console.log(jsonResponse)
				const searchResults = jsonResponse.results.map((result) => {
					return {
						animeImage: result.image_url,
						animeEpisodes: result.episodes,
						animeSynopsis: result.synopsis,
						animeName: result.title
					}
				})
				console.log(searchResults)
				setSelectedAnime(searchResults);
			})

	}, [searchQuery])


	const handleSubmit = (event) => {
		event.preventDefault();
		setSelectedAnime("")
	}

	const handleUserSearch = (event) => {
		let inputValue = event.target.value
		setSearchQuery(inputValue);
	}

	return(
		<div>
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
			{selectedAnime.map(({ animeImage, animeEpisodes, animeSynopsis, animeName}, index) => {
            return (
				<li key={index}>
					<h3>{animeName}</h3>
					<p># of Episodes {animeEpisodes}</p>
					<p>{animeSynopsis}</p>
					<img src={animeImage} alt={`promotional poster of ${animeName}`} />
				</li>
				)})
			}
		</div>
	)
}

export default Search;