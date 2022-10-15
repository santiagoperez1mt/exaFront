import { Form } from "react-bootstrap";
var theSetStatus;
function cambiarEstado(e){
    let el=document.getElementById("selectStatus");
    theSetStatus(el.value)
}
function ChooseFilterProduct({ setStatus }) {
    theSetStatus=setStatus
    let el = (
        <>
            <label htmlFor="selectStatus">Seleccione un filtro</label>
            <Form.Select
                onChange={cambiarEstado}
                aria-label="Default select example"
                key="filterSelect"
                name="selectStatus"
                id="selectStatus"
            >
                <option disabled>Seleccione el filtro de búsqueda</option>
                <option value="none">Ninguno</option>
                <option value="description">Por nombre</option>
                <option value="price">Por precio</option>
                <option value="category">Por categoría</option>
            </Form.Select>
        </>
    );
    return el;
}
export default ChooseFilterProduct;
