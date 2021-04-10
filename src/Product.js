import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'


const Product = () => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const {productID} = useParams()

    const fetchData = async () => {
        try {
    const {data}  = await axios.get(`/api/products?id=${productID}`)
    setProduct(data)
        } catch (error) {
            
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
        
    }, [])
    
if(loading) {
    return (<section className="section section-center">'
    <h2>loading...</h2>
    </section>
    )
}
// const {fields} = product
const {name, description, price, images, company } = product
console.log(name)
    return (
        <section className="section section-center">
           <Link to="/" className="link">
           back home
           </Link>
           <div className="title">
           <h2>{name}</h2>
           <div className="underline"></div>
           <article className="single-product">
           <img src={images[1].url} alt={name} className="single-product-img"/>
           <div>
           <h5>{name}</h5>
           <h5 className="price">€{price/100}</h5>
            <p>{company}</p>
           <p>{description}</p>
           </div>
           </article>
           
           </div>
        </section>
    )
}

export default Product
