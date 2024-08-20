import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import WrapLayout from '@/app/components/wrap-layout';
import "../../styles/index.css";
import Image from 'next/image';
import img1 from '../../assets/images/items/img1.jpg';
import img2 from '../../assets/images/items/img2.jpg';
import img3 from '../../assets/images/items/img3.jpg';
import img4 from '../../assets/images/items/img4.jpg';
import img5 from '../../assets/images/items/img5.jpg';
import ShowItemDetails from '@/app/modals/show-item-details';
import EditItemDetails from '@/app/modals/edit-item-details';
import AddItemDetails from '@/app/modals/add-item-details';
import { callToDeleteProductDetail, callToFetchProductDetails } from '@/utils/apis';
import dynamic from "next/dynamic";
import { FaPencil } from 'react-icons/fa6';
import { MdDeleteForever } from "react-icons/md";

const GeneratePDF = dynamic(() => import("../../app/components/generatePdf"), { ssr: false });

const categories = [
    {
        id: "ceramic_pots",
        title: "Ceramic Pots",
        img: img1
    },
    {
        id: "ceramic_crockery",
        title: "Ceramic Crockery",
        img: img2
    },
    {
        id: "ceramic_defuser",
        title: "Ceramic Defuser",
        img: img3
    },
    {
        id: "ceramic_vase",
        title: "Ceramic Vase",
        img: img4
    },
    {
        id: "all",
        title: "All",
        img: img5
    }
];

const AdminDashboard = () => {
    const ref: any = React.useRef();

    const [itemInfo, setItemInfo] = useState<any>({});
    const [itemEditInfo, setItemEditInfo] = useState<any>({});
    const [currentItemId, setCurrentItemId] = useState('');
    const [currentEditItemId, setCurrentEditItemId] = useState('');
    const [updatedSearchValue, setUpdatedSearchValue] = useState('');
    const [isLoadingData, setisLoadingData] = useState(false);
    const [isEditLoadingData, setisEditLoadingData] = useState(false);
    const [itemsDataMain, setItemsDataMain] = useState<any>([]);
    const [itemsData, setItemsData] = useState<any>([]);
    const [isItemsDataLoading, setIsItemsDataLoading] = useState(false);
    const [isAddLoadingData, setisAddLoadingData] = useState(true);
    const [currentCategory, setCurrentCategory] = useState('');

    useEffect(() => {
        setisLoadingData(true);
        const currentItemData = itemsDataMain && itemsDataMain.filter((user: any) => user.id === currentItemId);
        setItemInfo(currentItemData[0]);
        setisLoadingData(false);
    }, [currentItemId]);

    useEffect(() => {
        setIsItemsDataLoading(true);
        const filteredItemsData = itemsDataMain && itemsDataMain.filter((itm: any) => {
            const name = itm.name.toLowerCase();
            const sku = itm.sku.toLowerCase();
            const size = itm.size.toLowerCase();
            const price = itm.price ? itm.price.toString() : '';
            const category = itm.category.toLowerCase();
            const height = itm.height.toLowerCase();
            console.log('height -> ', height);
            const dia = itm.dia.toLowerCase();
            return name.includes(updatedSearchValue.toLowerCase()) ||
                sku.includes(updatedSearchValue.toLowerCase()) ||
                price.includes(updatedSearchValue.toLowerCase()) ||
                category.includes(updatedSearchValue.toLowerCase()) ||
                size.includes(updatedSearchValue.toLowerCase()) ||
                height.includes(updatedSearchValue.toLowerCase()) ||
                dia.includes(updatedSearchValue.toLowerCase());
        });
        setItemsData(filteredItemsData);
        setIsItemsDataLoading(false);
    }, [updatedSearchValue]);

    const fetchCurrentCatgoryData = async () => {
        setIsItemsDataLoading(true);
        const data = await callToFetchProductDetails({
            category: currentCategory
        });
        setItemsDataMain(data);
        setItemsData(data);
        setIsItemsDataLoading(false);
    };

    const apiBaseUrl = "https://shyamaceramics.in.net/api"
    const imageUrlPath = apiBaseUrl + "/resources/static/assets/uploads/";

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

    const deleteItem = async (item_id: any) => {
        try {
            const response = await callToDeleteProductDetail({ item_id });
            console.log('response -> ', response);
        } catch (error) {
            console.error('Error occurred while deleting item:', error);
        }
    };

    return <WrapLayout>
        <React.Fragment>
            <ShowItemDetails
                currentItem={itemInfo}
                isLoadingData={isLoadingData}
            />
            <EditItemDetails
                currentItem={itemEditInfo}
                isLoadingData={isEditLoadingData}
                setIsItemsDataLoading={setIsItemsDataLoading}
                fetchCurrentCatgoryData={fetchCurrentCatgoryData}
            />
            <AddItemDetails
                setIsItemsDataLoading={setIsItemsDataLoading}
                fetchCurrentCatgoryData={fetchCurrentCatgoryData}
            />

            <Row style={{ marginTop: '20px', padding: '0 2%' }}>
                {
                    (currentCategory && currentCategory.length > 0) &&
                    <div className="row" style={{ marginLeft: '1%' }}>
                        <div className="col-sm-12 col-xs-12 col-6 col-md-6">
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">
                                    @
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search any item .."
                                    onChange={(event: any) => {
                                        if (event) {
                                            setUpdatedSearchValue(event.target.value);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-xs-12 col-6 col-md-6">
                            <button
                                className="btn btn-info"
                                type="button"
                                data-bs-toggle="modal" data-bs-target="#add-items-details-modal"
                                style={{ marginRight: '5px', marginBottom: '5px' }}
                            >
                                Add Product
                            </button>
                            <GeneratePDF html={ref} />
                        </div>
                    </div>
                }
                <br /><br />

                {
                    isItemsDataLoading ?
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
                        <>
                            {
                                (currentCategory && currentCategory.length > 0) ?
                                    ((itemsData && itemsData.length) ?
                                        <>
                                            <button
                                                type="button"
                                                className="btn btn-info"
                                                onClick={() => {
                                                    setCurrentCategory('');
                                                }}
                                                style={{ width: '100px', marginLeft: '2%' }}
                                            >
                                                Back
                                            </button>
                                            <br />
                                            <div className="main">
                                                <div className="content" ref={ref}>
                                                    <Row style={{ marginTop: '20px', padding: '0 2%' }} id='exportCompletePage'>
                                                        {
                                                            itemsData.map((item: any, index: any) => {

                                                                const allHeightsArr = item.height.split(' ,');
                                                                const allDiaArr = item.dia.split(' ,');

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

                                                                const itemImage = (item && item.images && item.images.includes(',')) ? item.images.split(',')[0] : item.images;
                                                                return (
                                                                    <Col key={index} md={6} xl={4} xxl={4}>
                                                                        <Card style={{ marginBottom: '10px', zIndex: 2 }}>
                                                                            <div className="container-d-c">
                                                                                <Image
                                                                                    loader={() => imageUrlPath + itemImage}
                                                                                    className='container-d-c-img'
                                                                                    src={imageUrlPath + itemImage}
                                                                                    width={100}
                                                                                    height={100}
                                                                                    alt="Snow"
                                                                                    style={{
                                                                                        height: 'auto',
                                                                                        width: 'auto'
                                                                                    }}
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#show-items-details-modal"
                                                                                    onClick={() => {
                                                                                        setCurrentItemId(item.id);
                                                                                    }}
                                                                                />
                                                                                <div
                                                                                    className="bottom-left-d-c"
                                                                                    style={{
                                                                                        bottom: '25px',
                                                                                        color: 'black'
                                                                                    }}
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#show-items-details-modal"
                                                                                    onClick={() => {
                                                                                        setCurrentItemId(item.id);
                                                                                    }}
                                                                                >{item.name}</div>
                                                                                <div style={{ cursor: 'pointer' }}>
                                                                                    <div style={{ display: 'flex', width: '70px', justifyContent: 'space-between' }}>
                                                                                        <div
                                                                                            className="bottom-right-t-c"
                                                                                            onClick={async () => {
                                                                                                const userConfirmed = window.confirm("Are you sure you want to delete this item?");
                                                                                                if (userConfirmed) {
                                                                                                    await deleteItem(item.id);
                                                                                                    fetchCurrentCatgoryData();
                                                                                                }
                                                                                            }}
                                                                                            style={{
                                                                                                height: '30px',
                                                                                                width: '30px',
                                                                                                border: '1px solid black',
                                                                                                padding: '5px',
                                                                                                borderRadius: '50%',
                                                                                                right: '60px'
                                                                                            }}
                                                                                        >
                                                                                            <MdDeleteForever style={{ fontSize: '18px', color: 'red' }} />
                                                                                        </div>
                                                                                        <div
                                                                                            className="bottom-right-t-c"
                                                                                            data-bs-toggle="modal"
                                                                                            data-bs-target="#edit-items-details-modal"
                                                                                            onClick={() => {
                                                                                                setItemEditInfo(item);
                                                                                            }}
                                                                                            style={{
                                                                                                height: '30px',
                                                                                                width: '30px',
                                                                                                border: '1px solid black',
                                                                                                padding: '5px',
                                                                                                borderRadius: '50%',
                                                                                                right: '16px'
                                                                                            }}>
                                                                                            <FaPencil style={{ fontSize: '18px', color: 'blue' }} />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <br />
                                                                            <div style={{ padding: '0 10px' }}>
                                                                                <div style={{ display: 'flex' }}>
                                                                                    <div style={{ width: '55px', marginBottom: '10px', fontSize: '14px' }}>Price: </div>
                                                                                    <div>₹ {item.price}</div>
                                                                                </div>
                                                                                <div style={{ display: 'flex' }}>
                                                                                    <div style={{ width: '55px', marginBottom: '10px', fontSize: '14px' }}>Size: </div>
                                                                                    <div style={{ width: '100%' }}>
                                                                                        {renderedItems}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <br />
                                                                        </Card>
                                                                    </Col>
                                                                )
                                                            })
                                                        }
                                                    </Row>
                                                </div>
                                            </div>
                                        </> :
                                        <>
                                            <br />
                                            <button
                                                type="button"
                                                className="btn btn-info"
                                                onClick={() => {
                                                    setCurrentCategory('');
                                                }}
                                                style={{ width: '100px', marginLeft: '2%' }}
                                            >
                                                Back
                                            </button>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '400px',
                                                fontWeight: 'bold',
                                                fontSize: '20px'
                                            }}>
                                                No Data Found
                                            </div>
                                        </>)
                                    :
                                    <Row style={{ marginTop: '20px', padding: '0 2%' }}>
                                        {
                                            categories.map((item: any, index: any) => {
                                                return <Col key={index} md={6} xl={4} xxl={4}>
                                                    <Card style={{ marginBottom: '10px', zIndex: 2 }}>
                                                        <div className="container-d-c" style={{ height: '250px', cursor: 'pointer' }}
                                                            onClick={async () => {
                                                                setIsItemsDataLoading(true);
                                                                const data = await callToFetchProductDetails({
                                                                    category: item.id
                                                                });
                                                                setItemsDataMain(data);
                                                                setItemsData(data);
                                                                setIsItemsDataLoading(false);
                                                                setCurrentCategory(item.id);
                                                            }}>
                                                            <Image className='container-d-c-img' src={item.img} alt="Snow" style={{ height: '100%', width: '100%' }} />
                                                            <div className="bottom-left-d-c" style={{
                                                                bottom: '25px'
                                                            }}>{item.title}</div>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            })
                                        }
                                    </Row>
                            }
                        </>
                }

            </Row>
        </React.Fragment>
    </WrapLayout>
}

export default AdminDashboard;
