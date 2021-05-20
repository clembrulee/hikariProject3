// import components to be used in Search component
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IconContext } from 'react-icons'

// initialize search function 
const Search = (props) => {
	const { onSearchReturned } = props;

	// initialize searchQuery state for user's search query
	const [searchQuery, setSearchQuery] = useState('');

	// create function for calling API when user's search is submitted
	const userSearch = (() => {
		let searchURL = new URL('https://api.jikan.moe/v3/search/anime?')

		const searchParams = new URLSearchParams(
			{
				q: searchQuery,
				order_by: "title",
				sort: "asc",
				rated: "pg13",
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
				// return search results array and searchquery for title
				onSearchReturned(searchResults, searchQuery);
			})
	})

	// handle submit function on form submit
	const handleSubmit = (event) => {
		event.preventDefault();
		userSearch();
	}

	// handle user's search query
	const handleUserSearch = (event) => {
		let inputValue = event.target.value
		setSearchQuery(inputValue);
	}

	// render form to page
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
				<button id="submitButton" className="submitButton" type="submit">
					<span>Submit</span> 
				<IconContext.Provider value={{ className: 'react-icons' }}>
					<FaSearch />
				</IconContext.Provider>
				</button>
			</form>
		</div>
	)
}

export default Search;