import ProductService from "../../services/ProductService";
import {Button, Form, Modal} from "react-bootstrap";
import React from "react";
import Functions from "../shared/Functions";
import { Link} from 'react-router-dom'
class ProductList extends React.Component {
    getProducts = () => {
        ProductService.getAll()
            .then((response) => {
                this.setState({ products: response.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    componentDidMount() {
        this.getProducts();
    }
    state = {
        products: [],
    };
    handleRemove(product, e) {
        let opc = window.confirm(
            "¿Está seguro de que desea eliminar el producto " +
            product.id +
            "?"
        );
        if (opc) {
            ProductService.remove(product.id)
                .then((response) => {
                    if (response.status === 204) {
                        alert("Producto Eliminado");
                        this.getProducts();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    render() {
        return (
            <>
                <div className="container-fluid" style={{marginTop: "5%"}}>
                    <div className="row">
                        <div className="col-md-10">
                            <h1>Productos</h1>
                            <Link to={"/"} className={"btn btn-warning"}>Volver al menú principal</Link>
                        </div>
                        <div className="col-md-2">
                            <ModalProduct
                                title="Crear Producto"
                                getProducts={this.getProducts}
                            ></ModalProduct>
                        </div>
                    </div>
                    <div className="row">
                        <table className="table table-hover table-responsive table-striped">
                            <thead>
                            <tr>
                                <th>Refrencia</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Descripción</th>
                                <th>Disponibilidad</th>
                                <th>Cantidad</th>
                                <th>Foto</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.availability ? "Sí" : "No"}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <img
                                            src={product.imageUrl}
                                            alt={product.id}
                                            width={100}
                                            height={55}
                                        />
                                    </td>
                                    <td>
                                        <div className="d-grid gap-2">
                                            <ModalProduct
                                                title={"Editar producto"}
                                                product={product}
                                                getProducts={this.getProducts}
                                            />
                                            <button
                                                className="btn btn-danger"
                                                onClick={(e) => this.handleRemove(product, index, e)}
                                            >
                                                Eliminar producto
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}
export default ProductList;

class ModalProduct extends React.Component {
    state = {
        show: false,
        product: {
            id: this.props.product ? this.props.product.id : undefined,
            name: this.props.product ? this.props.product.name : "",
            description: this.props.product ? this.props.product.description : "",
            category: this.props.product ? this.props.product.category :  {id: 1, name: "Tenis"},
            availability: this.props.product ? this.props.product.availability : true,
            price: this.props.product ? this.props.product.price : 0,
            quantity: this.props.product ? this.props.product.quantity : 0,
            imageUrl: this.props.product ? this.props.product.imageUrl : "",
        },
        categories:[
            {id: 1, name: "Tenis"},
            {id: 2, name: "Camisetas" },
        ],
    };
    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });
    handleChange(e){
        let newValue = e.target.value;
        let newProduct = this.state.product;
        newProduct["category"] =  this.state.categories.find(element => element.id === parseInt(newValue));
        this.setState({ product: newProduct });
    }
    handleInput(e, type) {
        let newValue = e.target.value;
        if (Functions.isNumeric(newValue)) {
            if (newValue.startsWith("0")) {
                newValue = newValue.substring(1);
            }
            newValue = parseFloat(newValue);
        }
        let newProduct = this.state.product;
        newProduct[type] = newValue;
        this.setState({ product: newProduct });
    }
    handleRadio(e, type) {
        let newProduct = this.state.product;
        newProduct["availability"] = type === "availability";
        this.setState({ product: newProduct });
    }
    handleSubmit(e, type, product) {

        if (type === "Crear Producto") {
            delete product.id;
            console.log(product)
            ProductService.create(product)
                .then((response) => {
                    alert("Producto creado");
                    this.handleClose();
                    this.props.getProducts();
                    this.setState({
                        product: {
                            id: "",
                            name: "",
                            description: "",
                            category: this.state.categories.find(element => element.id=== 1),
                            availability: true,
                            price: 0,
                            quantity: 0,
                            imageUrl: "",
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (type === "Editar producto") {
            ProductService.update(product)
                .then((response) => {
                    alert("Producto actualizado");

                    this.props.getProducts();
                    this.handleClose();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    closeModal() {
        if (this.props.title === "Crear Producto") {
            this.setState({
                product: {
                    id: "",
                    name: "",
                    description: "",
                    category: this.state.categories.find(element =>element.id=== 1),
                    availability: true,
                    price: 0,
                    quantity: 0,
                },
            });

        }
        this.handleClose();
    }
    handleClick(e, type) {
        if (this.props.title === "Crear Producto") {
            e.target.value = "";
            let newValue = e.target.value;
            let newProduct = this.state.product;
            newProduct[type] = newValue;
            this.setState({ product: newProduct });
        }
    }
    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    {this.props.title}
                </Button>

                <Modal size="xl" show={this.state.show} onHide={(e)=>{this.closeModal(e)}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form
                            id="login-form"
                            className="form row g-2"
                            action=""
                            method="post"
                        >

                            <div className="col-md-6">
                                <label htmlFor="selectStatus">Seleccione la categoría</label>
                                <Form.Select
                                    onChange={(e)=> {this.handleChange(e,"category")}}
                                    aria-label="Category select"
                                    key="categorySelect"
                                    name="selectCategory"
                                    id="category"
                                >
                                    <option disabled></option>
                                    {
                                        this.state.categories.map((category, id)=>(
                                            <option key={id} value={category.id} selected={category.id === this.state.product.category.id}>{category.name}</option>
                                        ))
                                    }
                                </Form.Select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="price" className="p3">
                                    Precio:
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    className="form-control"
                                    required
                                    maxLength="80"
                                    value={this.state.product.price}
                                    onChange={(e) => this.handleInput(e, "price")}
                                    onClick={(e) => this.handleClick(e, "price")}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="" className="p3">
                                    Disponibilidad:
                                </label>
                                <br />
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="radioDisponibilidad"
                                        id="radioDisponibilidadSi"
                                        defaultChecked={this.state.product.availability}
                                        onChange={(e) => this.handleRadio(e, "availability")}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="radioDisponibilidadSi"
                                    >
                                        Sí
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="radioDisponibilidad"
                                        id="radioDisponibilidadNo"
                                        defaultChecked={!this.state.product.availability}
                                        onChange={(e) => this.handleRadio(e, "noavailability")}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="radioDisponibilidadNo"
                                    >
                                        No
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="name" className="p3">
                                    Nombre:
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    required
                                    maxLength="80"
                                    value={this.state.product.name}
                                    onChange={(e) => this.handleInput(e, "name")}
                                    onClick={(e) => this.handleClick(e, "name")}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="description" className="p3">
                                    Descripción:
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="form-control"
                                    required
                                    maxLength="80"
                                    value={this.state.product.description}
                                    onChange={(e) => this.handleInput(e, "description")}
                                    onClick={(e) => this.handleClick(e, "description")}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="quantity" className="p3">
                                    Cantidad:
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    className="form-control"
                                    value={this.state.product.quantity}
                                    onChange={(e) => this.handleInput(e, "quantity")}
                                    onClick={(e) => this.handleClick(e, "quantity")}
                                />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="photo" className="p3">
                                    Foto (enlace):
                                </label>
                                <input
                                    type="text"
                                    name="photo"
                                    id="photo"
                                    className="form-control"
                                    value={this.state.product.imageUrl}
                                    onChange={(e) => this.handleInput(e, "imageUrl")}
                                    onClick={(e) => this.handleClick(e, "imageUrl")}
                                />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={(e)=>{this.closeModal(e)}}>
                            Cerrar
                        </Button>
                        <Button
                            variant="primary"
                            onClick={(e) =>
                                this.handleSubmit(e, this.props.title, this.state.product)
                            }
                        >
                            {this.props.title}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
