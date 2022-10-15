import http from './http-config';

const getAll = ()=> {
    return http.get("/products/all");
}

const get = (reference)=> {
    return http.get(`/products/${reference}`);
}

const create = (data)=> {
    return http.post(`/products/save`, data);
}

const update = (data) =>{
    return http.put(`/products/update`, data);
}

const remove = (reference)=> {
    return http.delete(`/products/${reference}`);
}

const findByPrice = (price) => {
    return http.get(`/products/price/${price}`);
}

const findByCategory = (category) => {
    return http.get(`/products/category/${category}`);
}

const findByName = (name) => {
    return http.get(`/products/name/${name}`);
}
const getAllCategories = ()=>{
    return http.get(`/products/categorias`);
}

const getByLessOrEqualPrice=(price)=>{
    return http.get(`/products/price/${price}`);
}

const exportedObject = {
    getAll,
    get,
    create,
    update,
    remove,
    findByPrice,
    findByCategory,
    findByName,
    getAllCategories,
    getByLessOrEqualPrice,
}
export default exportedObject;