import Search from './Search.js'

const Header = (props) => {

	const {buttonHandler} = props

	return(
		<header>
			<div className="wrapper headerContainer">
				<div className="nav">
					<div className="titleText">
						<h1>Hikari</h1>
						<h2>Find your next anime to watch!</h2>
					</div>
					<div className="menuButtons">
						<button onClick={buttonHandler} id="airing">Top Currently Airing </button>
						<button onClick={buttonHandler} id="upcoming">Most Anticipated Upcoming</button>
						<button onClick={buttonHandler} id="tv">Top Anime TV</button>
						<button onClick={buttonHandler} id="movie">Top Anime Movie</button>
					</div>
					<Search />
				</div>
			</div>
		</header>
	)
}

export default Header;