import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Pokedex from './pokedex/Pokedex.jsx';
import Pokemon from './pokedex/Pokemon.jsx';
import Content from './pokedex/Content.jsx';

const history = createBrowserHistory();

class App extends Component {

	render() {

		return (
			<Router history={history}>
			<div>
				<Content>
					<Route exact path="/app" component={PokedexView}/>
					<Route exact path="/app/pokemon/:id" component={PokemonView}/>
				</Content>
			</div>
			</Router>
		)
	}
}

const PokedexView = ({ match }) => {
	return (
		<div>
			<Pokedex />
		</div>
	)
}

const PokemonView = ({ match }) => {
	return (
		<div>
			<Pokemon pokemonId={match.params.id}/>
		</div>
	)
}


export default App;