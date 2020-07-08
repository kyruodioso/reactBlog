import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import Global from '../Global';
import Sidebar from './Sidebar';
import ImageDefault from '../assets/images/imagenPrueba-hd.jpg';


//1. Tenemos que recoger el id del articulo a editar de la url
//2. Crear un metodo para sacar ese objeto del backend
//3. Redoblar / rellenar el formulario con esos datos
//4. Actualizar el objeto haciendo una peticion al backend

class EditArticle extends Component {

    url = Global.url;

    articleId = null;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    UNSAFE_componentWillMount() {
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);

        this.validator = new SimpleReactValidator({
            messages: {
                required: "El campo es requerido"
            }
        });
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                })
            });
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        });

    }

    saveArticle = (e) => {
        e.preventDefault();
        //rellenar state con formulario
        this.changeState();

        if (this.validator.allValid) {

            // Hacer una petición http por post para guardar el articulo
            axios.put(this.url + 'article/' + this.articleId, this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });

                        swal(
                            'Articulo editado',
                            'El articulo ah sido editado correctamente',
                            'success'
                        )

                        // Subir la imagen
                        if (this.state.selectedFile !== null) {

                            // Sacar el id del articulo guardado
                            var articleId = this.state.article._id;

                            //Crear form data y añadir fichero
                            const formData = new FormData();

                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );

                            //Fichero ajax
                            axios.post(this.url + 'upload-image/' + articleId, formData)
                                .then(red => {
                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        });
                                    } else {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        });
                                    }
                                });


                        } else {
                            this.setState({
                                status: 'success'
                            });
                        }


                    } else {
                        this.setState({
                            status: 'failed'
                        });
                    }
                });
        } else {
            this.setState({
                status: 'failed'
            });
        }

        this.validator.showMessages();
        this.forceUpdate();
    }


    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }


    render() {

        if (this.state.status === 'success') {
            return <Redirect to="/blog" />;
        }

        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader"> Editar articulo</h1>
                    {this.state.article.title &&
                        <form className="mid-form" onSubmit={this.saveArticle}>

                            <div className="form-group">
                                <label htmlFor="title">Titulo</label>
                                <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.changeState} />
                            </div>

                            {this.validator.message('title', this.state.article.title, 'required|alpha')}

                            <div className="form-group">
                                <label htmlFor="title">Contenido</label>
                            <textarea name="content" defaultValue={article.content} ref={this.contentRef} onChange={this.changeState}></textarea>
                            </div>



                            <div className="form-group">
                            <label htmlFor="file0">Image</label>
                          
                            <input type="file" name="file0" onChange={this.fileChange} />
                            <div className="image-wrap">
                                {article.image !== null ? (
                                    <img src={this.url + 'get-image/' + article.image} alt={article.title} className="thumb" />
                                ) : (
                                        <img src={ImageDefault} alt={article.title} className="thumb" />
                                    )
                                }
                            </div>
                        </div>
                        <div className="clearfix"></div>
                            <input type="submit" value="editar" className="btn btn-success" />
                        </form>

                    }

                    {!this.state.article.title &&
                    <h1 className="subheader">Cargando...</h1>
                    }
  
                </section>
                <Sidebar />
            </div>

        );
    }

}




export default EditArticle;