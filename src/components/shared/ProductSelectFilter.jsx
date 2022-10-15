
import ProductService from "../../services/ProductService"
import {Form} from "react-bootstrap";
import Functions from "./Functions";

function aplicarFiltroPalabra(e,setProducts){
    const getProductsByName=()=>{
        ProductService.findByName(e.target.value).then((response)=>{
            if(response.data===null){
                setProducts([])
            }else{
                setProducts(response.data);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    getProductsByName();
}

function aplicarFiltroPrecio(e,setProducts){
    const getProductsByPrice=()=>{
        ProductService.getByLessOrEqualPrice(e.target.value).then((response)=>{
            if(response.data===null){
                setProducts([])
            }else{
                setProducts(response.data);
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    getProductsByPrice();
}

function aplicarFiltroCategoria(e,setProducts){
    const getProductsByCategory=()=>{
        if (Functions.isNumeric(e.target.value)){
            ProductService.findByCategory(e.target.value).then((response)=>{
                if(response.data===null){
                    setProducts([])
                }else{
                    setProducts(response.data);
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
    getProductsByCategory()
}
function ProductSelectFilter({status,setProducts,products}){
    switch(status){
        case "none":
        case "":
        function getAllProducts(){
            ProductService.getAll().then((response)=>{
                if(products.length!==response.data.length){
                    setProducts(response.data);
                }

            }).catch((err)=>{
                console.log(err);
            })
        }
            getAllProducts();
            return <></>
        case "description":
            return (
                <>
                    <label htmlFor="word">Digite una palabra para filtrar productos</label>
                    <input
                        className="form-control"
                        type="text"
                        name="word"
                        id="word"
                        onChange={(e)=>aplicarFiltroPalabra(e,setProducts)}
                    />
                </>
            );
        case "price":
            return (
                <>
                    <label htmlFor="price">Digite un precio para filtrar</label>
                    <input
                        className="form-control"
                        type="number"
                        name="price"
                        id="price"
                        onChange={(e)=>aplicarFiltroPrecio(e,setProducts)}
                    />
                </>
            );
        case "category":
            return (<>
                    <label htmlFor="categoryFilter">Seleccione un filtro</label>
                    <Form.Select
                        onChange={(e) => aplicarFiltroCategoria(e,setProducts)}
                        aria-label="Default select example"
                        name="categorySelect"
                        id="categoryFilter"
                    >
                        <option disabled>Seleccione el filtro de búsqueda</option>
                        <option value="">Ninguno</option>
                        <option value="1">Tenis</option>
                        <option value="2">Camisetas</option>

                    </Form.Select>
                </>
            )
        default:
            return <></>
    }

}
export default ProductSelectFilter;