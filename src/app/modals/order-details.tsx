import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { callToFetchUserDetails } from "@/utils/apis";
import GeneratePdf from '../components/generatePdf';

const OrderDetails = ({ isLoadingData = true, currentOrderData, isAdmin = true }: any) => {
    const ref: any = React.useRef();
    const apiBaseUrl = "https://shyamaceramics.in.net/api"
    const imageUrlPath = apiBaseUrl + "/resources/static/assets/uploads/";
    const [order, setorder] = useState<any>(currentOrderData);
    const [orderPrice, setorderPrice] = useState<number>(0);
    const [orderQuantity, setorderQuantity] = useState<number>(0);
    const [userName, setUserName] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [userAddress, setUserAddress] = useState('');

    const callToFetchUserData = async () => {
        const user_details: any = await callToFetchUserDetails();
        if (user_details) {
            setUserName(user_details.name);
            setUserMobile(user_details.mobile);
            setUserAddress(user_details.address);
        }
    };

    useEffect(() => {
        callToFetchUserData();
    }, [isLoadingData, currentOrderData]);


    useEffect(() => {
        setorder(currentOrderData);
        if (currentOrderData && currentOrderData.length > 0) {
            let finalAmount = 0;
            let finalQuantity = 0;
            currentOrderData.forEach((it: any) => {
                finalAmount += (it.price * it.quantity);
                finalQuantity += it.quantity;
            });
            setorderPrice(finalAmount);
            setorderQuantity(finalQuantity);
        }
    }, [currentOrderData]);

    function Export2Doc(element: any, filename = '') {
        var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
        var postHtml = "</body></html>";
        const htmlDoc: any = document.getElementById(element);
        var html = preHtml + htmlDoc.innerHTML + postHtml;

        var blob = new Blob(['\ufeff', html], {
            type: 'application/msword'
        });

        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html)

        filename = filename ? filename + '.doc' : 'document.doc';

        var downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);
        const newNavigator: any = navigator;
        if (newNavigator && newNavigator.msSaveOrOpenBlob) {
            newNavigator.msSaveOrOpenBlob(blob, filename);
        } else {
            downloadLink.href = url;

            downloadLink.download = filename;

            downloadLink.click();
        }
        document.body.removeChild(downloadLink);
    }

    const ShareButton = () => {
        Export2Doc('exportContent', 'test');
    };

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

    return <>
        <div className="modal" tabIndex={-1} id="orders-details-modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Order Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {
                        isLoadingData ?
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
                            order &&
                            <>
                                <div className="modal-body" id="exportContent" ref={ref}>
                                    <div id='exportCompletePage'>
                                        {
                                            !isAdmin &&
                                            <div style={{
                                                border: '1px solid black',
                                                marginBottom: '10px',
                                                padding: '3px 10px',
                                                borderRadius: '10px',
                                                backgroundColor: 'rgb(252 170 18 / 34%)'
                                            }}>
                                                <div><span style={{ fontWeight: 'bold' }}>User Name: </span>{userName}</div>
                                                <div><span style={{ fontWeight: 'bold' }}>Mobile: </span>{userMobile}</div>
                                                <div><span style={{ fontWeight: 'bold' }}>Address: </span>{userAddress}</div>
                                            </div>
                                        }
                                        {
                                            (order.length > 0) &&
                                            order.map((it: any, index: number) => {

                                                const allHeightsArr = it.height.split(' ,');
                                                const allDiaArr = it.dia.split(' ,');

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

                                                const renderedItems = valuesList.map(label => {
                                                    const heightValue = heightMap.get(label);
                                                    const diaValue = diaMap.get(label);
                                                    const isShowLabel = allDiaArr && allDiaArr.length > 1;
                                                    return heightValue && diaValue ? renderItem(label, heightValue, diaValue, isShowLabel) : null;
                                                });

                                                const imageUrl = it && it.images && it.images.split(',')[0];
                                                return <div key={index} className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-12 col-md-6">
                                                                <Image loader={() => imageUrlPath + imageUrl} src={imageUrlPath + imageUrl} width={50} height={50} alt="Snow" style={{ height: '100%', width: '75%' }} />
                                                            </div>
                                                            <div className="col-12 col-md-6">
                                                                <h5 className="card-title">
                                                                    <span style={{ fontWeight: 'bold' }}>Name: </span> {it.name}
                                                                </h5>
                                                                <h5 className="card-title">
                                                                    <span style={{ fontWeight: 'bold' }}>Item Price: ₹ </span> {it.price}
                                                                </h5>
                                                                <h5 className="card-title">
                                                                    <span style={{ fontWeight: 'bold' }}>Quantity: </span> {it.quantity}
                                                                </h5>
                                                                <h5 className="card-title">
                                                                    <span style={{ fontWeight: 'bold' }}>Total Price: ₹ </span> {it.price * it.quantity}
                                                                </h5>
                                                                <h5 className="card-title">
                                                                    <span style={{ fontWeight: 'bold' }}>Category: </span> {it.category.split('_').join(' ')}
                                                                </h5>
                                                                <h5 className="card-title">
                                                                    <span style={{ fontWeight: 'bold' }}>Sizes: </span>
                                                                    {renderedItems}
                                                                </h5>
                                                                <h5 className="card-title">
                                                                    <span style={{ fontWeight: 'bold' }}>Description: </span> {it.description}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                            <div>
                                                <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
                                                    Total Amount: ₹
                                                </span>
                                                {orderPrice}
                                            </div>
                                            <div>
                                                <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
                                                    Total Quantity:
                                                </span>
                                                {orderQuantity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                    <div className="modal-footer">
                        {/* <button type="button" onClick={ShareButton} className="btn btn-warning" data-bs-dismiss="modal">Download</button> */}
                        <GeneratePdf html={ref} />
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default OrderDetails;
