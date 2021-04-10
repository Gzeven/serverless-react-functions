require('dotenv').config()
const Airtable = require('airtable-node');

 
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('app5z1CXXL6lOoV9A')
  .table('products')


exports.handler = async (event, context) => {
    const {id} = event.queryStringParameters
    if(id) {
      try {
         const product = await airtable.retrieve(id)
          const productData = {
            id,
            stock: product.fields.stock,
            price: product.fields.price,
            shipping: product.fields.shipping,
            colors: product.fields.colors,
            category: product.fields.category,
            images: product.fields.images,
            reviews: product.fields.reviews,
            stars: product.fields.stars,
            name: product.fields.name,
            description: product.fields.description,
            company: product.fields.company,
            featured: product.fields.featured,

          }
          
          
          
         if(product.error) {
         return {
           statusCode: 404,
           body: `No product with id: ${id}`,

             }    
         }
             return {
          statusCode: 200,
          body: JSON.stringify(productData)

}
      } catch (error) {
       return {
           statusCode: 500,
           body: `Server error`,

             }       

      }
  
    }
    try {
      const {records} = await airtable.list({maxRecords: 200}) 
      const products = records.map((product)=> {
          const {id} = product;
          const {name,images, price, description, colors, company, category, shipping, featured} = product.fields
          const image = images[0].url
          return {id, name, price, image, colors, company,  description, category, shipping, featured}
      })
      return {

statusCode: 200,
body: JSON.stringify(products)

}
    } catch (error) {
       return {

statusCode: 500,
body: "Server Error"

} 
    }
}