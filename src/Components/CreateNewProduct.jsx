import React, { useState, useCallback } from 'react'
import axios from '../Services/axios'
// import RichEditor from './RichText/RichEditor'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { stateToHTML } from 'draft-js-export-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDropzone } from "react-dropzone";
import { toast } from 'react-toastify';
import { new_product_url, products_url } from '../Utils/constants';

function CreateNewProduct({ productModal, toggleModal, fetchProducts }) {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const html = stateToHTML(editorState.getCurrentContent());
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imageList, setImageList] = useState([]);

    //I had to use the imageList dependency in the useCallback hook to update the imageList lenght 
    //to check if user upload more than 4 images. 
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

    const onToggleModal = () => {
        toggleModal();
        setId('');
        setName('');
        setPrice('');
        setDescription('');
        setEditorState(EditorState.createEmpty());
        setImageList([]);
        const iName = document.getElementById("name");

        iName.value = "";

    }




    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(imageList[0])
        axios.post(new_product_url, {
            id,
            name,
            description,
            price,
            imageList,
        }).then((res) => {
            
            toast.success('Product Created Successfully')
            console.log(res)
            fetchProducts();
            toggleModal();
            
        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <>

            <div id="defaultModal" tabIndex="-1" aria-hidden="true" className={productModal ? "flex  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full sm:mt-[150px] xl:mt-[0px]" : "hidden"}>
                <div className="relative p-4 w-full max-w-2xl xl:h-full md:h-auto ">
                    <div className="relative p-4 bg-[#EDF2F7] rounded-lg shadow-2xl  sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900  ">
                                Create New Product
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="defaultModal" onClick={onToggleModal}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form action="#" className='px-2'>
                            <div className="flex w-full mb-5">
                                <div className='w-full'>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Product ID: </label>
                                    <input type="text" name="id" value={id} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-50 p-2.5 mb-3" required onChange={(e) => setId(e.target.value)} />
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name: </label>
                                    <input type="text" name="name" id="name" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  mb-3" required onChange={(e) => setName(e.target.value)} />
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Description: </label>

                                    <div className="bg-white">
                                        <Editor
                                            editorState={editorState}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                            onEditorStateChange={(newEditorState) => {
                                                setEditorState(newEditorState);
                                                setDescription(html)
                                            }}
                                        />
                                    </div>


                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 mt-2">Price: </label>
                                    <input type="number" step={0.01} name="price" value={price} id="price" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-50 p-2.5 mb-3" required onChange={(e) => setPrice(e.target.value)} />
                                    <label htmlFor="name" className="block mb-5 text-sm font-medium text-gray-900 ">Images: </label>
                                    <div className='h-24 outline-gray-300 outline-dotted px-5 flex flex-col items-center justify-center bg-orange-200 rounded-lg'   {...getRootProps()}>
                                        <input {...getInputProps()} />

                                        {
                                            isDragActive ? (<p>Drop the files here ...</p>) :

                                                (<> <p>Drag drop image file here, or click to select files</p>
                                                    <p>(Only *.jpeg and *.png images will be accepted)</p></>)
                                        }

                                    </div>
                                    <div className='mt-4 flex flex-wrap'>
                                        {imageList.map((image, index) => (
                                            <div key={index} className=' mt-3 w-24 h-24 mr-2 mb-2 flex flex-col items-center justify-center'>
                                                <img src={image} alt="" className='rounded-xl w-24 h-24 ' />
                                                <button className='border-2 border-red-700 rounded-lg mt-2 px-3 hover:bg-red-500 hover:font-semibold' onClick={removeImage}>Delete</button>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                            <button className=' h-[40px] px-5 bg-blue-600 hover:bg-blue-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mb-3' onClick={handleSubmit}>Save change</button>

                        </form>
                    </div>
                </div>
            </div>
        </>



    )
}

export default CreateNewProduct