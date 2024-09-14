import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from "axios";
import { callToUpdateProductDetail } from '@/utils/apis';

interface EditItemDetailsProps {
    currentItem: any;
    setIsItemsDataLoading(arg: boolean): void;
    fetchCurrentCatgoryData(): void;
    isLoadingData: boolean;
}

const EditItemDetails = ({ currentItem, setIsItemsDataLoading, fetchCurrentCatgoryData, isLoadingData = true }: EditItemDetailsProps) => {
    const [item, setItem] = useState<any>({});
    const [name, setname] = useState<any>('');
    const [price, setprice] = useState<any>(0);
    const [file, setFile] = useState<any>([]);
    const [renderedItems, setRenderedItems] = useState<any>(null);

    useEffect(() => {
        setItem(currentItem);
        if (currentItem) {
            setname(currentItem.name);
            setprice(currentItem.price);
        }
        if (currentItem) {
            const valuesList = ['XL', 'Big', 'Medium', 'Small', 'Very Small'];

            const renderItem = (label: any, height: any, dia: any, isShowLabel = false) => {
                return (
                    <div className="row">
                        {isShowLabel &&
                            <div className="col-12 col-md-3">
                                <div style={{ fontWeight: 'bold' }}>{label}</div>
                            </div>}
                        <div className="col-12 col-md-9">
                            <div>Height: {height} <span style={{ fontWeight: 'bold' }}>in</span> Dia: {dia} <span style={{ fontWeight: 'bold' }}>in</span></div>
                        </div>
                    </div>
                );
            };
            if (currentItem.height && currentItem.dia) {
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
                    const isShowLabel = allDiaArr && allDiaArr.length > 1;
                    return heightValue && diaValue ? renderItem(label, heightValue, diaValue, isShowLabel) : null;
                });
                setRenderedItems(renderItems);
            }
        }
    }, [currentItem]);

    function handleChange2(event: any) {
        setFile(event.target.files);
    }

    const updateProductDetails = async (event: any) => {
        event.preventDefault();

        if (!name || !price || !(file && file.length)) {
            return;
        }

        setIsItemsDataLoading(true);
        const apiBaseUrl = 'https://shyamaceramics.in.net/api';
        const url = apiBaseUrl + '/product/upload';
        const formData: any = new FormData();

        for (let i = 0; i < Object.keys(file).length; i++) {
            formData.append('file', file[i]);
            formData.append('fileName', file[i].name);
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        await axios.post(url, formData, config).then(async (response) => {
            let img_url = (response && response.data) ? response.data : [];
            img_url = img_url.toString();

            const productPayload = {
                id: item.id,
                name,
                price,
                images: img_url
            }
            const res = await callToUpdateProductDetail(productPayload);
            console.log(res);
        });
        fetchCurrentCatgoryData();
        event.target.reset();
        toast.success("Product updated Successfully !");
    }

    return <>
        <div className="modal" tabIndex={-1} id="edit-items-details-modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Item Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={updateProductDetails}>
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
                                    <div>
                                        <div style={{ marginBottom: '10px', display: 'flex' }}>
                                            <div style={{ fontWeight: 'bold', width: '30%' }}>Item ID: </div>{item.id}
                                        </div>
                                        <div style={{ marginBottom: '10px', display: 'flex' }}>
                                            <div style={{ fontWeight: 'bold', width: '30%' }}>Category: </div>{item.category ? item.category.split('_').join(' ') : ''}
                                        </div>
                                        <div style={{ marginBottom: '10px', display: 'flex' }}>
                                            <div style={{ fontWeight: 'bold', width: '30%' }}>Size: </div>
                                            <div>
                                                {renderedItems}
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: '10px', display: 'flex' }}>
                                            <div style={{ fontWeight: 'bold', width: '30%' }}>Name: </div>
                                            <input
                                                required
                                                onChange={(event: any) => {
                                                    setname(event.target.value)
                                                }}
                                                type="text"
                                                value={name}
                                                style={{ border: '1px solid black', paddingLeft: '5px', borderRadius: '5px', height: '25px' }}
                                            />
                                        </div>
                                        <div style={{ marginBottom: '10px', display: 'flex' }}>
                                            <div style={{ fontWeight: 'bold', width: '30%' }}>Price: </div>
                                            <b>₹ </b><input
                                                onChange={(event: any) => {
                                                    setprice(event.target.value)
                                                }}
                                                type="text"
                                                style={{ border: '1px solid black', marginLeft: '5px', paddingLeft: '5px', borderRadius: '5px', height: '25px' }}
                                                value={price}
                                            />
                                        </div>
                                        <div style={{ marginBottom: '10px', display: 'flex' }}>
                                            <div style={{ fontWeight: 'bold', width: '44%' }}>Upload All Image: </div>
                                            <input type="file" name="photos" onChange={handleChange2} multiple />
                                        </div>
                                        <div style={{ fontSize: '13px', backgroundColor: 'yellow' }}>
                                            <span style={{ fontWeight: 'bold' }}>Note: </span>The newly selected images will replace the old ones.</div>
                                        <br />
                                        {(!name || !price || !(file && file.length > 0)) && (
                                            <div style={{ color: 'red', fontSize: '13px', textAlign: 'center' }}>!! Some Fields are missing !!</div>
                                        )}
                                        <br />
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <button
                                                type="submit"
                                                className="btn btn-outline-warning"
                                                data-bs-dismiss="modal"
                                                style={{ marginRight: '10px' }}
                                                disabled={!name || !price || !file}
                                            >
                                                Update
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-info"
                                                data-bs-dismiss="modal"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div >
    </>
}

export default EditItemDetails;
