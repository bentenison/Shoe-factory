import React, { useState } from "react";
import {AddProduct} from "../../redux/actions/ProductActions"
import {connect} from "react-redux"
import {motion} from "framer-motion"
 const Add = (props) => {
  const [imagePreviewUrl, setimagePreviewUrl] = useState(null);
  const [vendor, setVendor] = useState('');
  const [productTitle, setProduct] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(null);

  
  let imagePreview = (
    <div className="previewText col s12 center">
      Please select an Image for Preview
    </div>
  );
  if (imagePreviewUrl) {
    imagePreview = (
      <div className="image-container col s12 center">
        <img src={imagePreviewUrl} alt="icon" width="300" />{" "}
      </div>
    );
  }
  const fileChangedHandler = (e) => {
    var file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setimagePreviewUrl(
         reader.result
      )
    };
    //reader.readAsDataURL(e.target.files[0]);
  };
  const Handlesubmit=(e)=>{
    e.preventDefault()
    const newProduct = {
      image:imagePreviewUrl,
      vendor,
      productTitle,
      description,
      price,
      posted_at:new Date()
    }
    console.log(props)
   props.AddProduct(newProduct)
   console.log(newProduct)
  }
  return (
    <motion.div className="container"
    initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
      <div className="card">
        <div className="card-title center-align orange-text text-darken-2"><h3>Sale Your Shoes!!</h3></div>
        <div className="row">
          <form className="col s12 m12" onSubmit={Handlesubmit}>
            <div className="row">
              <div className="input-field col s12 m6">
                <i className="material-icons prefix">create</i>
                <input
                  id="icon_prefix"
                  type="text"
                  className="validate"
                  placeholder="Eg. Nike Shoes"
                  onChange={(e)=>setProduct(e.target.value)}
                />
                <label htmlFor="icon_prefix">Product Title</label>
              </div>
              <div className="input-field col s12 m6">
                <i className="material-icons prefix">face</i>
                <input
                  id="icon_telephone"
                  type="text"
                  className="validate"
                  placeholder="Eg. John Doe"
                  onChange={(e)=>setVendor(e.target.value)}
                />
                <label htmlFor="icon_telephone">Vendor Name</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6">
                <div className="file-field input-field">
                  <div className="btn orange darken-2">
                    <span>File</span>
                    <input type="file" onChange={fileChangedHandler} />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">{imagePreview}</div>
            <div className="row">
              <div className="input-field col s12 m12">
              <i className="material-icons prefix">format_align_left</i>
                <textarea
                  id="textarea1"
                  className="materialize-textarea"
                  onChange={(e)=>setDescription(e.target.value)}
                ></textarea>
                <label htmlFor="textarea1">Description</label>
              </div>
              <div className="input-field col s12 m6">
                <i className="material-icons prefix">money</i>
                <input
                  id="icon_telephone"
                  type="tel"
                  className="validate"
                  placeholder="Eg. 1200"
                  onChange={(e)=>setPrice(e.target.value)}
                />
                <label htmlFor="icon_telephone">Price</label>
              </div>
            </div>
            <button
              className="btn waves-effect waves-light orange darken-2 right"
              type="submit"
              name="action"
            >
              Submit
              <i className="material-icons right">add</i>
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

//export default (Add)

const mapDispatchToProps = (dispatch)=>{
 return{
   AddProduct:(newProduct)=>dispatch(AddProduct(newProduct))
 }
}


export default connect(null,mapDispatchToProps)(Add)
