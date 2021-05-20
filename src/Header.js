import Search from './Search.js'

const Header = (props) => {

	const {buttonHandler, onSearchReturned} = props

	return(
		<header>
			<div className="wrapper headerContainer">
				<div className="nav">
					<div className="titleText">
						<h1>Hikari</h1>
						<h2>Find your next anime to watch!</h2>
					</div>
					<div className="menu">
						<div className="menuButtons">
							<button onClick={buttonHandler} id="airing" tabIndex="0">Top Currently Airing </button>
							<button onClick={buttonHandler} id="upcoming" tabIndex="0">Most Anticipated Upcoming</button>
							<button onClick={buttonHandler} id="tv" tabIndex="0">Top Anime TV</button>
							<button onClick={buttonHandler} id="movie" tabIndex="0">Top Anime Movie</button>
						</div>
						<Search onSearchReturned={onSearchReturned}/>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header;