import { Link} from 'react-router-dom'
function Index(){
    return  <div className="container-fluid">
        <div className="row" >
            <div className="col-md-12">
                <center><h1>Comercializadora - A tiro de As</h1></center>
            </div>
        </div>
        <div className="row" style={{marginTop:"20%"}}>
            <div className="col-md-2">

            </div>
            <div className="col-md-4">
                <Link to={"/ProductList"} > Listar Productos</Link>
            </div>
            <div className="col-md-4">
                <Link to={"/Catalog"}> Ver catálogo</Link>
            </div>
        </div>
    </div>;
}

export default Index;