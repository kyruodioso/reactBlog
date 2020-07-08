import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';



class Home extends Component {


    render() {


        return (
            <div id="home">
                <Slider
                    title="Bienvenido a la pagina del curso"
                    btn="Ir al Blog"
                    size="slider-big"
                />
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Ultimos articulos</h1>
                        <Articles
                        home="true"
                        />
                    </div>
                    <Sidebar />

                </div>
            </div>
        )

    }

}

export default Home;