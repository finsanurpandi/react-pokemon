import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Pokemon from './Pokemon.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Pokedex extends Component {

  constructor(props){
    super(props);
    this.state = {
      ability : [],
      allData : [],
      species : [],
      next : [],
      prev : [],
      perPage: 100
    }
  }

  getAllPokemonData(){
    $.ajax({
      url: this.props.pokeApi+'/api/v2/pokemon?limit='+this.state.perPage,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({species: data.results,
                next: data.next,
                prev: data.previous,
                allData: data});
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({species: null});
      }.bind(this)
    });

  }

  getNextPokemonData(){
    $.ajax({
      url: this.state.next,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({species: data.results,
                next: data.next,
                prev: data.previous});
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({species: null});
      }.bind(this)
    });

  }

  getPrevPokemonData(){
    $.ajax({
      url: this.state.prev,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({species: data.results,
                next: data.next,
                prev: data.previous});
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({species: null});
      }.bind(this)
    });

  }

  componentDidMount(){
    this.getAllPokemonData();
  }

  getPokemonList(){
      const {species} = this.state;

      return species.map((pokemon, index) =>{
        return <PokemonList
                pokemon={pokemon}
                key={pokemon.name}
                id={index+1}/>
      })
  }

  nextPrev(){
    let prevDisabled = false;
    let nextDisabled = false;

    if (this.state.prev == null) {
      prevDisabled = true
    };

    if(this.state.next == null){
      nextDisabled = true
    }

      return (
      <div className="pull-right">
        <div className="btn-group btn-group-sm" role="group" aria-label="...">
          <button onClick={this.getPrevPokemonData.bind(this)} disabled={prevDisabled} type="button" className="btn btn-primary">prev</button>
          <button onClick={this.getNextPokemonData.bind(this)} disabled={nextDisabled} type="button" className="btn btn-primary">next</button>
        </div>
      </div>
      
      
      )
  }
    
    render() {
      const species = this.state.species;
      const no = function(a){
        return a.substr(49).split('/').join('')
      };

        return (
            <Router>
            <div>
            <Route exact={true} path="/app" render={() => (
              
              <div className="row">
                
                  {this.nextPrev()}
                  <br/><hr/>

                {
                species.map((pokemon, index) => (  
                  
                  <main key={index}>
                    <div className="col-md-3 col-sm-4 col-xs-6">
                    <div className="panel panel-default">
                      <div className="panel-heading text-center"><h4>#{no(pokemon.url)}.{pokemon.name}</h4></div>
                      <div className="panel-body text-center">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${no(pokemon.url)}.png`}/>
                      </div>
                      <div className="panel-footer">
                        <div className="clearfix">
                        <div className="btn-group btn-group-xs pull-right">
                          <Link to={`pokemon/${no(pokemon.url)}`} className="btn btn-primary">detail</Link>
                        </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </main>
                  ))
              }
              </div>
            )}/> 
            <Route exact path="/app/pokemon/:id" component={PokemonView}/>  
            </div>
            </Router>
        )
    }
}

const PokemonView = ({ match }) => {
  return (
    <div>
      <Pokemon pokemonId={match.params.id}/>
    </div>
  )
}

Pokedex.propTypes = {
  pokeApi: React.PropTypes.string,
};

Pokedex.defaultProps = {
  pokeApi: 'YOUR_API_KEY',
}

export default Pokedex;
