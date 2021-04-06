import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const url = '/api/products'

const Airtable = () => {
    const [products, setProducts] = useState([]);

    const fetchData = async () => {
        try {
            const {data } = await axios.get(url)
            console.log(data)
            setProducts(data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
       fetchData()
        
    }, [])
    return (
        <section className="section section-center">
          <div className="title">
          <h2>Airtable</h2>
          <div className="title-underline"></div>
          <div className="products">
          {products.map((product)=> {
              const {id, image, price, name} = product
              return <Link to={`/${id}`} className="product" key={id}>
              <img src={image} alt={name}/>
              <div className="info">
              <h5>{name}</h5>
              <h5 className='price'>€{price}</h5>
              </div>
              </Link>
          })}</div>
          </div>
        </section>
    )
}

export default Airtable
