import React, { useState, useCallback, useEffect } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { get_single_product } from "../Utils/constants"
import { useParams } from 'react-router-dom';
import { EditorState, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { useDropzone } from "react-dropzone";
import { toast } from 'react-toastify';
import axios from '../Services/axios';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
function EditProduct() {

  const { id } = useParams();
  console.log(id)
  const [product, setProduct] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const html = stateToHTML(editorState.getCurrentContent());
  const [imageList, setImageList] = useState([]);
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {

    console.log(imageList.length)
    console.log(acceptedFiles.length + imageList.length)
    // console.log(nImages)
    if (imageList.length <= 3 && (acceptedFiles.length + imageList.length) <= 4) {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setImageList((prev) => {
            return [...prev, reader.result];
          });

        };
        reader.readAsDataURL(file);
      });
    } else {
      toast.error('You can only upload 4 images')
    }
  }, [imageList]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });

  const removeImage = (e, index) => {
    e.preventDefault();
    setImageList((prev) => {
      prev.splice(index, 1);
      console.log(prev);
      return [...prev];
    });
  };

  useEffect(() => {

    axios.get("/api/product/" + id + "/edit").then((response) => {

      console.log(response.data.data[0]);
      setProduct(response.data.data[0]);
      setImages(response.data.data[0].images)
      // setDescription(response.data.data[0].description);
      console.log(product)
      const blocksFromHTML = stateFromHTML(response.data.data[0].description);
      setEditorState(EditorState.createWithContent(blocksFromHTML))
    }).catch((error) => {
      setProduct(null);
      console.error(error);
    });



  }, [])

  // useEffect(() => {
  //   const blocksFromHTML = stateFromHTML(description);
  //   setEditorState(EditorState.createWithContent(blocksFromHTML));
  // }, [id]);

  return (
    <>
      <div className="mx-auto mt-[100px] shadow-2xl bg-[#EDF2F7] xl:w-[550px] sm:w-[380px] px-8 py-6 rounded-xl">
        <form action="" className='flex flex-col '>
          <label htmlFor="">Product ID:</label>
          <input type="text" name="pID" value={product?.id || ''} className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-30 p-2.5 mb-3' />
          <label htmlFor="">Name: </label>
          <input type="text" name="pName" value={product?.title || ''} className='"bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  mb-3' />
          <label htmlFor="" className='mb-2'>Description:</label>
          <div className="bg-white mb-7 px-2 min-h-[300px]">
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              value={description}
              onEditorStateChange={(newEditorState) => {
                setEditorState(newEditorState);
                setDescription(html)
              }}
            />
          </div>
          <label htmlFor="">Price</label>
          <input type="text" className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-50 p-2.5 mb-7' value={product?.price || ''} />
          <div className='h-24 outline-gray-300 outline-dotted px-5 flex flex-col items-center justify-center bg-orange-200 rounded-lg mb-9 '   {...getRootProps()}>
            <input {...getInputProps()} />

            {
              isDragActive ? (<p>Drop the files here ...</p>) :

                (<> <p>Drag drop image file here, or click to select files</p>
                  <p>(Only *.jpeg and *.png images will be accepted)</p></>)
            }

          </div>
          <div className='mt-4 flex flex-wrap'>
            {product.images && product.images.map((item, index) => (
              <div key={index} className=' mt-3 w-24 h-24 mr-2 mb-2 flex flex-col items-center justify-center'>
                <img src={item.url} alt="" className='rounded-xl w-24 h-24 ' />
                <button className='border-2 border-red-700 rounded-lg mt-2 px-3 hover:bg-red-500 hover:font-semibold' onClick={removeImage}>Delete</button>
              </div>
            ))}

          </div>


          <button className=' h-[40px] px-5 bg-blue-600 hover:bg-blue-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mb-3'>Save changes</button>
        </form>




      </div>
    </>

  )
}

export default EditProduct