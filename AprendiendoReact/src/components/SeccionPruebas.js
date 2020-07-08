import React, { Component } from 'react';
import MiComponente from './MiComponente'


class SeccionPruebas extends Component {

    contador = 0;

    constructor(props) {
        super(props);

        this.state = {
        contador:0
        };
    }


    HolaMundo(nombre, edad) {
        var presentacion = (
            <div>
                <h2>Hola, soy {nombre}</h2>
                <h3>Tengo {edad} años</h3>
            </div>
        );
        return presentacion;
    }

    sumar() {
       // this.contador = this.contador + 1;
        this.setState({
            contador: (this.state.contador+1)
        })
    }

    restar() {
     //   this.contador = this.contador - 1;
        this.setState({
            contador: (this.state.contador - 1)
        })
    
    }

    render() {

        var nombre = "kyru Odioso";
        return (
            <section id="content">
                <h2 className="subheader">Últimos artículos</h2>
                <p>
                    Este es un nuevo titulo
        </p>
                <h2 className="subheader">Funciones y JSX Básico</h2>
                {this.HolaMundo(nombre, 12)}
                <section className="componentes">

                    <h2 className="subheader">Componentes</h2>
                    <MiComponente />
                    <MiComponente />

                    

                    <h2 className="subheader">Estados</h2>

                    <p>
                        Contador :{this.state.contador}
                    </p>
                    <p>
                        <input type="button" value="Sumar" onClick={this.sumar.bind(this)}/>
                        <input type="button" value="Restar" onClick={this.restar.bind(this)}/>
                    </p>

                </section>
            </section>
        );
    }
}

export default SeccionPruebas;