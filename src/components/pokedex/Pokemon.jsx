import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

class Pokemon extends Component {

	constructor(props){
		super(props);
		this.state = {
			allData : [],
			forms : [],
			abilities: [],
			sprites: [],
			types: [],
			evolve: [],
			id: this.props.pokemonId
		}
	}

	getAllPokemonData(){
		$.ajax({
			url: this.props.pokeApi+'/api/v2/pokemon/'+this.state.id,
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({forms: data.forms[0],
								abilities: data.abilities,
								allData: data,
								sprites: data.sprites,
								types: data.types
								});
				console.log(this.state.allData);
				console.log(this.state.forms);
				console.log(this.state.abilities);
				console.log(this.state.allData.weight);
				console.log(this.state.sprites);
				console.log(this.state.types);
			}.bind(this),
			error: function(xhr, status, err){
				this.setState({forms: null});
			}.bind(this)
		});

	}

	getEvolve(){
		$.ajax({
			url: this.props.pokeApi+'/api/v2/evolution-chain/'+this.state.id,
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({evolve: data.chain
								});
				console.log(this.state.evolve);
			}.bind(this),
			error: function(xhr, status, err){
				this.setState({forms: null});
			}.bind(this)
		});

	}

	getAbilities(){
	      const abilities = this.state.abilities;

	      return abilities.map((ability, index) =>{
	        return (
	        	<div key={index}>
	        		{ability.ability.name}
	        	</div>
	        )
	       })
	        
	  }

	getType(){
		const types = this.state.types;		

	    return types.map((type, index) => {
	    	return (
	    		<div key={index}>
	    			{type.type.name}
	    		</div>
	    	)
	    })
	}

	componentDidMount(){
		this.getAllPokemonData();
		this.getEvolve();
	}

	render(){
		const pokemon = this.state;
		return (
			<div>
				<div className="row">
				<div className="col-md-6 col-md-offset-3">
					<div className="panel panel-default">
					<div className="panel-heading text-center"><h4>#{pokemon.allData.id}.{pokemon.allData.name}</h4></div>
					<div className="panel-body text-center">
						<div className="row">
							<div className="col-md-3">
								<img src={pokemon.sprites.front_default} />
							</div>
							<div className="col-md-8">
								<h4>Height and Weight</h4>
								{pokemon.allData.height} inch and {pokemon.allData.weight} pounds
								<hr/>

								<h4>Abilities</h4>
								{this.getAbilities()}
								<hr/>

								<h4>Type</h4>
								{this.getType()}
								<hr/>
							</div>
						</div>
					</div>
					<div className="panel-footer">
						<div className="clearfix">
						<button className="btn btn-xs btn-primary" onClick={history.goBack}>back</button>
						</div>
					</div>
				</div>
				</div>
				</div>
			</div>
		)
	}
}

Pokemon.propTypes = {
  pokeApi: React.PropTypes.string,
};

Pokemon.defaultProps = {
  pokeApi: 'YOUR_API_KEY',
}

export default Pokemon;