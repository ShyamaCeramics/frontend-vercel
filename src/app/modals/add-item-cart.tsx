import React, { useEffect, useState } from 'react';
import { toast, Toaster } from "react-hot-toast";
import Image from 'next/image';
import ImageCarousel from '../components/image-carousel';
import img1 from '../../assets/images/items/img1.jpg';
import img2 from '../../assets/images/items/img2.jpg';
import img3 from '../../assets/images/items/img3.jpg';

const AddItemInCart = ({ currentItem, isLoadingData = true }: any) => {
    const [item, setItem] = useState<any>({});
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        setItem(currentItem);
    }, [currentItem]);

    return <>
        <div className="modal" tabIndex={-1} id="show-items-details-modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{item && item.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {
                        (isLoadingData || !item) ?
                            <div style={{ display: 'flex', height: '150px', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="spinner-grow text-primary" role="status" />
                                <div className="spinner-grow text-secondary" role="status" />
                                <div className="spinner-grow text-success" role="status" />
                                <div className="spinner-grow text-danger" role="status" />
                                <div className="spinner-grow text-warning" role="status" />
                                <div className="spinner-grow text-info" role="status" />
                                <div className="spinner-grow text-dark" role="status" />
                            </div>
                            :
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        {/* {item.img &&
                                            <Image className='container-d-c-img' src={item.img} alt="Snow" style={{ height: '100%', width: '100%' }} />
                                        } */}
                                        <div className="container-d-c" style={{ height: '200px', display: 'flex', alignItems: 'center', overflowY: 'hidden' }}>
                                            {/* <ImageCarousel img1={img1} img2={img2} img3={img3} slideIndex={slideIndex} setSlideIndex={setSlideIndex} /> */}
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div style={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                ID: {item.url}
                                                <br />
                                                Title: {item.title}
                                                <br />
                                                Amount: {item.amount}
                                                <br />
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => {
                                                        let oldCart: any = localStorage.getItem('cart');
                                                        if (oldCart) {
                                                            oldCart = JSON.parse(oldCart);
                                                        } else {
                                                            oldCart = [];
                                                        }
                                                        const isItemExist = oldCart && oldCart.find((it: any) => it.id === item.url);
                                                        if (!isItemExist) {
                                                            const currentItem = {
                                                                id: item.url,
                                                                qty: 1
                                                            }
                                                            oldCart.push(currentItem);
                                                            oldCart = JSON.stringify(oldCart);
                                                            localStorage.setItem('cart', oldCart);
                                                            toast.success('Item added to the cart !!');
                                                        } else {
                                                            toast.error('Item already exist in cart !!');
                                                        }
                                                    }}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                    }
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={() => {
                            setSlideIndex(0);
                        }}>Ok</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AddItemInCart;
