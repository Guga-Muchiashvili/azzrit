'use server'
export const  getImage = async() => {
    const result = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_API_NAME}/resources/image`,{
        headers : {
          Authorization : `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
        }
      }).then(res => {return res.json()})
      return result
}
