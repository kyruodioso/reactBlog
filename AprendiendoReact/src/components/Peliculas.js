import React, { Component } from 'react';
import Pelicula from './Pelicula';
import Slider from './Slider';
import Sidebar from './Sidebar';

class Peliculas extends Component{
    
    state = {
        peliculas: [
            { titulo: "Batman vs Superman", image: 'https://i.ytimg.com/vi/pa4UZGQTN8M/hqdefault.jpg' },
            { titulo: 'Gran Torino', image: 'https://carburando.com/sites/default/files/ford_gran_torino.jpg' },
            { titulo: 'Looper', image:'https://www.sonypictures.com/sites/default/files/styles/max_560x840/public/chameleon/title-movie/245353_LOOPER_1400x2100%20%28with%20UV%20logo%29_English.jpg?itok=c1VoI2Pe'}
        ],
        nombre: 'Kyru Odioso'
        
    };

    cambiarTitulo = () => {

        var { peliculas } = this.state;
        peliculas[0].titulo = "Batman Begins";
        
        this.setState({
            peliculas: peliculas
        });

    }


    render() {
        return (
            <React.Fragment>
            <Slider
                title="Peliculas"
                size="slider-small"
            />
            <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subheader">Listado de peliculas</h2>
                <p>Seccion de las peliculas favoritas de {this.state.nombre}</p>
                <div><button onClick={this.cambiarTitulo}> Cambiar titulo de Batman</button></div>

                {/**Crear componente peliculas */}
                <div id="articles" className="peliculas">
                {
                    this.state.peliculas.map((pelicula, i) => {
                        return (
                            
                            <Pelicula key={i} pelicula={pelicula}/>
                            
                        )
                        })
                      }
                    
            </div>
                </div>   
                <Sidebar
                    blog="false"
                />
                </div>
            </React.Fragment>
        )
    }

}

export default Peliculas;