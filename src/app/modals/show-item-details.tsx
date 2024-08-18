import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ImageCarousel from '../components/image-carousel';

const ShowItemDetails = ({ currentItem, isLoadingData = true }: any) => {
    const apiBaseUrl = "https://shyamaceramics.in.net/api";
    const imageUrlPath = apiBaseUrl + "/resources/static/assets/uploads/";

    const [item, setItem] = useState<any>({});
    const [images, setImages] = useState<string[]>([]);
    const [renderedItems, setRenderedItems] = useState<any>(null);
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        if (currentItem && currentItem.images) {
            setItem(currentItem);
            const imgs = currentItem.images.split(',').map((img: string) => imageUrlPath + img);
            setImages(imgs);
        }
        if (currentItem) {

            const valuesList = ['XL', 'Big', 'Medium', 'Small', 'Very Small'];

            const renderItem = (label: any, height: any, dia: any) => {
                return (
                    <div className="row">
                        <div className="col-12 col-md-3">
                            <div style={{ fontWeight: 'bold' }}>{label}</div>
                        </div>
                        <div className="col-12 col-md-9">
                            <div>Height: {height} <span style={{ fontWeight: 'bold' }}>in</span> Dia: {dia} <span style={{ fontWeight: 'bold' }}>in</span></div>
                        </div>
                    </div>
                );
            };

            const allHeightsArr = currentItem.height.split(' ,');
            const allDiaArr = currentItem.dia.split(' ,');

            const heightMap = new Map();
            const diaMap = new Map();
            allHeightsArr.forEach((h: any) => {
                const label = valuesList.find(v => h.startsWith(v));
                if (label) {
                    heightMap.set(label, h.replace(label, '').trim());
                }
            });
            allDiaArr.forEach((d: any) => {
                const label = valuesList.find(v => d.startsWith(v));
                if (label) {
                    diaMap.set(label, d.replace(label, '').trim());
                }
            });

            const renderItems = valuesList.map(label => {
                const heightValue = heightMap.get(label);
                const diaValue = diaMap.get(label);
                return heightValue && diaValue ? renderItem(label, heightValue, diaValue) : null;
            });
            setRenderedItems(renderItems);
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
                                        <div className="container-d-c height-200-300" style={{ display: 'flex', alignItems: 'center', overflowY: 'hidden' }}>
                                            <ImageCarousel
                                                slideIndex={slideIndex}
                                                setSlideIndex={setSlideIndex}
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
                                            SKU: {item.sku}
                                            <br />
                                            Sizes: {renderedItems}
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
