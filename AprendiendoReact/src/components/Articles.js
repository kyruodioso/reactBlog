import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/es';
import Global from '../Global';
import ImageDefault from '../assets/images/imagenPrueba-hd.jpg';

class Articles extends Component{

    url = Global.url;

    state = {
        articles: [],
        status: null
    };

    UNSAFE_componentWillMount() {
        var home = this.props.home;
        var search = this.props.search;

        if (home === "true") {
            this.getLastArticles();
        } else if (search && search !== null && search !== undefined) {
            this.getArticlesBySearch(search);
            
        }else {
            this.getArticles();
        }
        
    }

    getArticlesBySearch = (searched) => {
        axios.get(this.url + "search/" + searched)
            .then(res => {
                   
 
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
            })
            .catch(err => {
                this.setState({
                    articles: [],
                    status: 'success'
                });
            });
    }



    getLastArticles = () => {
        axios.get(this.url + "articles/last")
            .then(res => {

                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
           
            });
    }
    getArticles = () => {
        axios.get(this.url + "articles/last")
            .then(res => {

                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });

            });
    }

    render() {
        if (this.state.articles.length >= 1) {

            var listArticles = this.state.articles.map((article) => {

                return (
                    <article key={article._id} className="article-item" id="article-template">
                        <div className="image-wrap">
                            {article.image !== null ?(
                                <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                            ) : (
                                    <img src={ImageDefault} alt={article.title} />
                            )
                            }

                        </div>

                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment locale="es" fromNow>{article.date}</Moment> 
                        </span>
                        <Link to={'/blog/articulo/' +article._id}>Leer más</Link>

                        <div className="clearfix"></div>
                    </article>
                    
                );

            });

            return (
                <div id="articles">
                    {listArticles}
                </div>
            );
        } else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <div id="articles">
                    <h2 className="subheader">NO HAY ARTICULOS</h2>
                    <p>Todavia no hay contenido en esta seccion</p>
                </div>
            );
        } else {
            return (
                <div id="articles">
                    <h2 className="subheader">Cargando.....</h2>
                    <p>Espere un segundo</p>
                </div>
            );
        }

    }
}

export default Articles;