import React from 'react'
import {render} from 'react-dom'
import './pokedex.css'

const Sprite = ({name, imgPath}) => {
    return (
        <img alt={name} src={"https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/sprites/" + imgPath + ".png"}/>
    )
}

class Card extends React.Component{
    state = {
        loading: true,
        data: []
    }

    componentWillMount() {
        const url = "https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=" + this.props.pokemon
        fetch(url)
			.then(data => data.json())
			.then(data => this.setState({data, loading: false}))
    }

    render(){
        return (
            <div id='p1'>
                {this.state.loading
                    ? 'loading'
                    : 
                    <div className="card-container">
                        <div className="hp-info">
                            <p>HP</p>
                            <div className="health-bar"></div>
                        </div>
                        <div className="card">
                            <img src={"https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/icons/" + this.state.data['info']['type'] + ".jpg"} alt="Pokemon type" className="type" />
                            <span className="hp">HP: {this.state.data['hp']}</span>
                            <h2 className="name">{this.state.data['name']}</h2>
                            <div className="pokemon-pic">
                                <img src={"https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/images/" + this.state.data['shortname'] + ".jpg"} alt="pokemon" className="pokepic" />
                            </div>
                            <p className="info">{this.state.data['info']['description']}</p>
                            <div className="moves">
                                {this.state.data['moves'].map((move, i) => {
                                    return (
                                        <button disabled key={i}>
                                            <span className="move">{move['name']}</span> {move['dp'] ? <span className="dp">{move['dp']}</span> : ''}
                                            <img src={"https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/icons/" + move['type'] + ".jpg"} alt="Pokemon move" />
                                        </button>
                                    )
                                })}
                            </div>
                            <img src={"https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/icons/" + this.state.data['info']['weakness'] + ".jpg"} alt="weakness" className="weakness" />
                        </div>
                    </div>
                }
            </div>
        ) 
    }
}

class Pokedex extends React.Component{
    state = {
        data: [],
        loading: false,
        pokemon: 'bulbasaur',
        key: 1
    }

    componentDidMount(){
        this.setState.loading = true
        fetch('https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokedex=all')
            .then(data => data.text())
            .then(data => data.split('\n'))
            .then(data => this.setState({data, loading: false}))
    }

    updateCard = ({pokemonName}) => {
        this.setState.loading = true
        this.setState(prevState => 
            ({pokemon: pokemonName, loading: false, key: prevState.key+1})
        )
        console.log(this.state.pokemon)
    }

    render(){
        return (
            <body>
                <header>
                    <h1>Your Pokedex</h1>
                </header>
                <main>
                  {this.state.loading 
                    ?  'loading...'
                    : <Card pokemon={this.state.pokemon} key={this.state.key}/>
                  }
                  <div id="pokedex-view">
                  {this.state.loading 
					? "loading..."
					: <div id="pokedex-container">
						{this.state.data.map((product, i) => {
                            const pokemonName = product.split(':')[0]
                            const pokemonShortName = product.split(':')[1]
							return (
                                <div onClick={() => this.updateCard({pokemonName:pokemonShortName})} key={i}>
                                    <Sprite
                                        name={pokemonName}
                                        imgPath={pokemonShortName}
                                    />
                                </div>
							)
                        })}
                        </div>
                  }
                  </div>
              </main>
              <footer>
                <p>
                  Image credits: 
                  <a href="https://bulbapedia.bulbagarden.net/wiki/Bulbapedia:Copyrights">Bulbapedia</a>
                  (characters &copy; by Nintendo)
                  <br />
                  Pokemon Data credits:
                  University of Washington
                </p>
              </footer>
            </body>
        )
    }
}



render (
    <Pokedex />,
    document.getElementById('root')
)