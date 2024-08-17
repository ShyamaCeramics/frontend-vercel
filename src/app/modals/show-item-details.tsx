import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ImageCarousel from '../components/image-carousel';

const ShowItemDetails = ({ currentItem, isLoadingData = true }: any) => {
    const apiBaseUrl = "https://shyamaceramics.in.net/api";
    const imageUrlPath = apiBaseUrl + "/resources/static/assets/uploads/";

    const [item, setItem] = useState<any>({});
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        if (currentItem && currentItem.images) {
            setItem(currentItem);
            const imgs = currentItem.images.split(',').map((img: string) => imageUrlPath + img);
            setImages(imgs);
        }
    }, [currentItem]);

    return (
        <div className="modal" tabIndex={-1} id="show-items-details-modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{item.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {
                        (isLoadingData || !item) ?
                            <div style={{ display: 'flex', height: '150px', justifyContent: 'center', alignItems: 'center' }}>
                                {/* Loading Spinner */}
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
                                        <div className="container-d-c" style={{ height: '200px', display: 'flex', alignItems: 'center', overflowY: 'hidden' }}>
                                            <ImageCarousel
                                                img1={images[0] || ''}
                                                img2={images[1] || ''}
                                                img3={images[2] || ''}
                                                img4={images[3] || ''}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div>
                                            ID: {item.id}
                                            <br />
                                            Name: {item.name}
                                            <br />
                                            Price: {item.price}
                                            <br />
                                            Size: {item.size?.split('_').join(' ')}
                                            <br />
                                            SKU: {item.sku}
                                            <br />
                                            Height: {item.height} in
                                            <br />
                                            Dia: {item.dia} in
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                    }
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowItemDetails;
