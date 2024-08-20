import React, { useEffect, useState } from 'react';
import UploadImage from '../components/upload-image';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { Image, Upload } from 'antd';
import { callToSaveProductDetail } from '@/utils/apis';
import axios from "axios";
import toast from 'react-hot-toast';

const getBase64 = (file: any): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

interface AddItemDetailsProps {
    setIsItemsDataLoading(arg: boolean): void;
    fetchCurrentCatgoryData(): void;
}

const AddItemDetails = ({ setIsItemsDataLoading, fetchCurrentCatgoryData }: AddItemDetailsProps) => {
    // const [item, setItem] = useState<any>({});
    const [sku, setsku] = useState<any>({});
    const [name, setname] = useState<any>({});
    const [height1, setheight1] = useState<any>('');
    const [dia1, setdia1] = useState<any>('');
    const [height2, setheight2] = useState<any>('');
    const [dia2, setdia2] = useState<any>('');
    const [height3, setheight3] = useState<any>('');
    const [dia3, setdia3] = useState<any>('');
    const [height4, setheight4] = useState<any>('');
    const [dia4, setdia4] = useState<any>('');
    const [height5, setheight5] = useState<any>('');
    const [dia5, setdia5] = useState<any>('');
    const [price, setprice] = useState<any>([]);
    const [selectedPieceSet, setSelectedPieceSet] = useState('1_piece_set');
    const [selectedCategory, setSelectedCategory] = useState('ceramic_pots');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [file, setFile] = useState<any>([])
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
    ]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as any);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {/* <PlusOutlined /> */}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const saveProductDetails = async (event: any) => {
        event.preventDefault();

        if (!sku || !name || !price || !height1 || !dia1 || !(file && file.length)) {
            setFormSubmitted(true);
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
            const height = [height1, height2, height3, height4, height5];
            const dia = [dia1, dia2, dia3, dia4, dia5];
            let img_url = (response && response.data) ? response.data : [];
            img_url = img_url.toString();

            const productPayload = {
                sku,
                name,
                size: selectedPieceSet,
                height,
                dia,
                price,
                category: selectedCategory,
                images: img_url
            }
            const res = await callToSaveProductDetail(productPayload, 'product/save');
            console.log(res);
        });

        setsku('');
        setname('');
        setSelectedPieceSet('1_piece_set');
        setheight1('');
        setheight2('');
        setheight3('');
        setheight4('');
        setheight5('');
        setdia1('');
        setdia2('');
        setdia3('');
        setdia4('');
        setdia5('');
        setprice('');
        setSelectedCategory('ceramic_pots');
        setFile('');
        fetchCurrentCatgoryData();
        setIsItemsDataLoading(false);
        event.target.reset();
        toast.success("Product added Successfully !");
    }

    const HeightAndDia11 = ({ height, setheight, dia, setdia }: any) => {
        return <div style={{ display: 'flex', fontSize: '14px', marginTop: '5px' }}>
            Height: <input type="number"
                value={height}
                onChange={(e) => setheight(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }} /><b style={{ marginRight: '10px', marginLeft: '2px' }}>in</b>
            Dia: <input type="number"
                value={dia}
                onChange={(e) => setdia(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }}
            /><b style={{ marginLeft: '2px' }}>in</b>
        </div>
    }
    const HeightAndDia21 = ({ height, setheight, dia, setdia }: any) => {
        return <div style={{ display: 'flex', fontSize: '14px', marginTop: '5px' }}>
            Height: <input type="number"
                value={height}
                onChange={(e) => setheight(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }} /><b style={{ marginRight: '10px', marginLeft: '2px' }}>in</b>
            Dia: <input type="number"
                value={dia}
                onChange={(e) => setdia(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }}
            /><b style={{ marginLeft: '2px' }}>in</b>
        </div>
    }
    const HeightAndDia22 = ({ height, setheight, dia, setdia }: any) => {
        return <div style={{ display: 'flex', fontSize: '14px', marginTop: '5px' }}>
            Height: <input type="number"
                value={height}
                onChange={(e) => setheight(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }} /><b style={{ marginRight: '10px', marginLeft: '2px' }}>in</b>
            Dia: <input type="number"
                value={dia}
                onChange={(e) => setdia(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }}
            /><b style={{ marginLeft: '2px' }}>in</b>
        </div>
    }
    const HeightAndDia31 = ({ height, setheight, dia, setdia }: any) => {
        return <div style={{ display: 'flex', fontSize: '14px', marginTop: '5px' }}>
            Height: <input type="number"
                value={height}
                onChange={(e) => setheight(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }} /><b style={{ marginRight: '10px', marginLeft: '2px' }}>in</b>
            Dia: <input type="number"
                value={dia}
                onChange={(e) => setdia(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }}
            /><b style={{ marginLeft: '2px' }}>in</b>
        </div>
    }
    const HeightAndDia32 = ({ height, setheight, dia, setdia }: any) => {
        return <div style={{ display: 'flex', fontSize: '14px', marginTop: '5px' }}>
            Height: <input type="number"
                value={height}
                onChange={(e) => setheight(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }} /><b style={{ marginRight: '10px', marginLeft: '2px' }}>in</b>
            Dia: <input type="number"
                value={dia}
                onChange={(e) => setdia(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }}
            /><b style={{ marginLeft: '2px' }}>in</b>
        </div>
    }
    const HeightAndDia33 = ({ height, setheight, dia, setdia }: any) => {
        return <div style={{ display: 'flex', fontSize: '14px', marginTop: '5px' }}>
            Height: <input type="number"
                value={height}
                onChange={(e) => setheight(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }} /><b style={{ marginRight: '10px', marginLeft: '2px' }}>in</b>
            Dia: <input type="number"
                value={dia}
                onChange={(e) => setdia(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }}
            /><b style={{ marginLeft: '2px' }}>in</b>
        </div>
    }
    const HeightAndDia41 = ({ height, setheight, dia, setdia }: any) => {
        return <div style={{ display: 'flex', fontSize: '14px', marginTop: '5px' }}>
            Height: <input type="number"
                value={height}
                onChange={(e) => setheight(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }} /><b style={{ marginRight: '10px', marginLeft: '2px' }}>in</b>
            Dia: <input type="number"
                value={dia}
                onChange={(e) => setdia(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }}
            /><b style={{ marginLeft: '2px' }}>in</b>
        </div>
    }
    const HeightAndDia42 = ({ height, setheight, dia, setdia }: any) => {
        return <div style={{ display: 'flex', fontSize: '14px', marginTop: '5px' }}>
            Height: <input type="number"
                value={height}
                onChange={(e) => setheight(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }} /><b style={{ marginRight: '10px', marginLeft: '2px' }}>in</b>
            Dia: <input type="number"
                value={dia}
                onChange={(e) => setdia(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }}
            /><b style={{ marginLeft: '2px' }}>in</b>
        </div>
    }
    const HeightAndDia43 = ({ height, setheight, dia, setdia }: any) => {
        return <div style={{ display: 'flex', fontSize: '14px', marginTop: '5px' }}>
            Height: <input type="number"
                value={height}
                onChange={(e) => setheight(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }} /><b style={{ marginRight: '10px', marginLeft: '2px' }}>in</b>
            Dia: <input type="number"
                value={dia}
                onChange={(e) => setdia(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }}
            /><b style={{ marginLeft: '2px' }}>in</b>
        </div>
    }
    const HeightAndDia44 = ({ height, setheight, dia, setdia }: any) => {
        return <div style={{ display: 'flex', fontSize: '14px', marginTop: '5px' }}>
            Height: <input type="number"
                value={height}
                onChange={(e) => setheight(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }} /><b style={{ marginRight: '10px', marginLeft: '2px' }}>in</b>
            Dia: <input type="number"
                value={dia}
                onChange={(e) => setdia(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }}
            /><b style={{ marginLeft: '2px' }}>in</b>
        </div>
    }
    const HeightAndDia51 = ({ height, setheight, dia, setdia }: any) => {
        return <div style={{ display: 'flex', fontSize: '14px', marginTop: '5px' }}>
            Height: <input type="number"
                value={height}
                onChange={(e) => setheight(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }} /><b style={{ marginRight: '10px', marginLeft: '2px' }}>in</b>
            Dia: <input type="number"
                value={dia}
                onChange={(e) => setdia(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }}
            /><b style={{ marginLeft: '2px' }}>in</b>
        </div>
    }
    const HeightAndDia52 = ({ height, setheight, dia, setdia }: any) => {
        return <div style={{ display: 'flex', fontSize: '14px', marginTop: '5px' }}>
            Height: <input type="number"
                value={height}
                onChange={(e) => setheight(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }} /><b style={{ marginRight: '10px', marginLeft: '2px' }}>in</b>
            Dia: <input type="number"
                value={dia}
                onChange={(e) => setdia(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }}
            /><b style={{ marginLeft: '2px' }}>in</b>
        </div>
    }
    const HeightAndDia53 = ({ height, setheight, dia, setdia }: any) => {
        return <div style={{ display: 'flex', fontSize: '14px', marginTop: '5px' }}>
            Height: <input type="number"
                value={height}
                onChange={(e) => setheight(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }} /><b style={{ marginRight: '10px', marginLeft: '2px' }}>in</b>
            Dia: <input type="number"
                value={dia}
                onChange={(e) => setdia(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }}
            /><b style={{ marginLeft: '2px' }}>in</b>
        </div>
    }
    const HeightAndDia54 = ({ height, setheight, dia, setdia }: any) => {
        return <div style={{ display: 'flex', fontSize: '14px', marginTop: '5px' }}>
            Height: <input type="number"
                value={height}
                onChange={(e) => setheight(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }} /><b style={{ marginRight: '10px', marginLeft: '2px' }}>in</b>
            Dia: <input type="number"
                value={dia}
                onChange={(e) => setdia(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }}
            /><b style={{ marginLeft: '2px' }}>in</b>
        </div>
    }
    const HeightAndDia55 = ({ height, setheight, dia, setdia }: any) => {
        return <div style={{ display: 'flex', fontSize: '14px', marginTop: '5px' }}>
            Height: <input type="number"
                value={height}
                onChange={(e) => setheight(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }} /><b style={{ marginRight: '10px', marginLeft: '2px' }}>in</b>
            Dia: <input type="number"
                value={dia}
                onChange={(e) => setdia(e.target.value)}
                style={{
                    border: '1px solid black',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    height: '25px',
                    width: '40px',
                    marginLeft: '4px'
                }}
            /><b style={{ marginLeft: '2px' }}>in</b>
        </div>
    }

    function handleChange2(event: any) {
        setFile(event.target.files);
    }

    return <>
        <div className="modal" tabIndex={-1} id="add-items-details-modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Product</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={saveProductDetails}>
                            <div style={{ marginBottom: '10px', display: 'flex' }}>
                                <div style={{ fontWeight: 'bold', width: '30%' }}>SKU: </div>
                                <input
                                    required
                                    onChange={(event: any) => {
                                        setsku(event.target.value)
                                    }}
                                    type="text" style={{ border: '1px solid black', paddingLeft: '5px', borderRadius: '5px', height: '25px' }} />
                            </div>
                            <div style={{ marginBottom: '10px', display: 'flex' }}>
                                <div style={{ fontWeight: 'bold', width: '30%' }}>Product Name: </div>
                                <input
                                    required
                                    onChange={(event: any) => {
                                        setname(event.target.value)
                                    }}
                                    type="text" style={{ border: '1px solid black', paddingLeft: '5px', borderRadius: '5px', height: '25px' }} />
                            </div>
                            <div style={{ marginBottom: '10px', display: 'flex' }}>
                                <div style={{ fontWeight: 'bold', width: '30%' }}>Size: </div>
                                <div style={{ width: '70%' }}>
                                    <div className="row">
                                        <div className="col-12 col-md-4">
                                            <select
                                                name="cars"
                                                id="cars"
                                                style={{ border: '1px solid black', borderRadius: '5px' }}
                                                value={selectedPieceSet}
                                                onChange={(event) => {
                                                    setSelectedPieceSet(event.target.value);
                                                }}
                                            >
                                                <option value="1_piece_set">1 Piece Set</option>
                                                <option value="2_piece_set">2 Piece Set</option>
                                                <option value="3_piece_set">3 Piece Set</option>
                                                <option value="4_piece_set">4 Piece Set</option>
                                                <option value="5_piece_set">5 Piece Set</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-8">
                                            {
                                                selectedPieceSet === "1_piece_set" ?
                                                    <div className='row' style={{ alignItems: 'center' }}>
                                                        <div className='col-12 col-md-2' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                                                            Medium
                                                        </div>
                                                        <div className='col-12 col-md-9' style={{ fontWeight: 'bold' }}>
                                                            <HeightAndDia11 height={height1} setheight={setheight1} dia={dia1} setdia={setdia1} />
                                                        </div>
                                                    </div> :
                                                    selectedPieceSet === "2_piece_set" ?
                                                        <>
                                                            <div className='row' style={{ alignItems: 'center' }}>
                                                                <div className='col-12 col-md-2' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                                                                    Big
                                                                </div>
                                                                <div className='col-12 col-md-9' style={{ fontWeight: 'bold' }}>
                                                                    <HeightAndDia21 height={height1} setheight={setheight1} dia={dia1} setdia={setdia1} />
                                                                </div>
                                                            </div>
                                                            <div className='row' style={{ alignItems: 'center' }}>
                                                                <div className='col-12 col-md-2' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                                                                    Small
                                                                </div>
                                                                <div className='col-12 col-md-9' style={{ fontWeight: 'bold' }}>
                                                                    <HeightAndDia22 height={height2} setheight={setheight2} dia={dia2} setdia={setdia2} />
                                                                </div>
                                                            </div>
                                                        </> : selectedPieceSet === "3_piece_set" ?
                                                            <>
                                                                <div className='row' style={{ alignItems: 'center' }}>
                                                                    <div className='col-12 col-md-2' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                                                                        Big
                                                                    </div>
                                                                    <div className='col-12 col-md-9' style={{ fontWeight: 'bold' }}>
                                                                        <HeightAndDia31 height={height1} setheight={setheight1} dia={dia1} setdia={setdia1} />
                                                                    </div>
                                                                </div>
                                                                <div className='row' style={{ alignItems: 'center' }}>
                                                                    <div className='col-12 col-md-2' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                                                                        Medium
                                                                    </div>
                                                                    <div className='col-12 col-md-9' style={{ fontWeight: 'bold' }}>
                                                                        <HeightAndDia32 height={height2} setheight={setheight2} dia={dia2} setdia={setdia2} />
                                                                    </div>
                                                                </div>
                                                                <div className='row' style={{ alignItems: 'center' }}>
                                                                    <div className='col-12 col-md-2' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                                                                        Small
                                                                    </div>
                                                                    <div className='col-12 col-md-9' style={{ fontWeight: 'bold' }}>
                                                                        <HeightAndDia33 height={height3} setheight={setheight3} dia={dia3} setdia={setdia3} />
                                                                    </div>
                                                                </div>
                                                            </> : selectedPieceSet === "4_piece_set" ?
                                                                <>
                                                                    <div className='row' style={{ alignItems: 'center' }}>
                                                                        <div className='col-12 col-md-2' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                                                                            XL
                                                                        </div>
                                                                        <div className='col-12 col-md-9' style={{ fontWeight: 'bold' }}>
                                                                            <HeightAndDia41 height={height1} setheight={setheight1} dia={dia1} setdia={setdia1} />
                                                                        </div>
                                                                    </div>
                                                                    <div className='row' style={{ alignItems: 'center' }}>
                                                                        <div className='col-12 col-md-2' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                                                                            Big
                                                                        </div>
                                                                        <div className='col-12 col-md-9' style={{ fontWeight: 'bold' }}>
                                                                            <HeightAndDia42 height={height2} setheight={setheight2} dia={dia2} setdia={setdia2} />
                                                                        </div>
                                                                    </div>
                                                                    <div className='row' style={{ alignItems: 'center' }}>
                                                                        <div className='col-12 col-md-2' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                                                                            Medium
                                                                        </div>
                                                                        <div className='col-12 col-md-9' style={{ fontWeight: 'bold' }}>
                                                                            <HeightAndDia43 height={height3} setheight={setheight3} dia={dia3} setdia={setdia3} />
                                                                        </div>
                                                                    </div>
                                                                    <div className='row' style={{ alignItems: 'center' }}>
                                                                        <div className='col-12 col-md-2' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                                                                            Small
                                                                        </div>
                                                                        <div className='col-12 col-md-9' style={{ fontWeight: 'bold' }}>
                                                                            <HeightAndDia44 height={height4} setheight={setheight4} dia={dia4} setdia={setdia4} />
                                                                        </div>
                                                                    </div>
                                                                </> : selectedPieceSet === "5_piece_set" &&
                                                                <>
                                                                    <div className='row' style={{ alignItems: 'center' }}>
                                                                        <div className='col-12 col-md-2' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                                                                            XL
                                                                        </div>
                                                                        <div className='col-12 col-md-9' style={{ fontWeight: 'bold' }}>
                                                                            <HeightAndDia51 height={height1} setheight={setheight1} dia={dia1} setdia={setdia1} />
                                                                        </div>
                                                                    </div>
                                                                    <div className='row' style={{ alignItems: 'center' }}>
                                                                        <div className='col-12 col-md-2' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                                                                            Big
                                                                        </div>
                                                                        <div className='col-12 col-md-9' style={{ fontWeight: 'bold' }}>
                                                                            <HeightAndDia52 height={height2} setheight={setheight2} dia={dia2} setdia={setdia2} />
                                                                        </div>
                                                                    </div>
                                                                    <div className='row' style={{ alignItems: 'center' }}>
                                                                        <div className='col-12 col-md-2' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                                                                            Medium
                                                                        </div>
                                                                        <div className='col-12 col-md-9' style={{ fontWeight: 'bold' }}>
                                                                            <HeightAndDia53 height={height3} setheight={setheight3} dia={dia3} setdia={setdia3} />
                                                                        </div>
                                                                    </div>
                                                                    <div className='row' style={{ alignItems: 'center' }}>
                                                                        <div className='col-12 col-md-2' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                                                                            Small
                                                                        </div>
                                                                        <div className='col-12 col-md-9' style={{ fontWeight: 'bold' }}>
                                                                            <HeightAndDia54 height={height4} setheight={setheight4} dia={dia4} setdia={setdia4} />
                                                                        </div>
                                                                    </div>
                                                                    <div className='row' style={{ alignItems: 'center' }}>
                                                                        <div className='col-12 col-md-2' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                                                                            Very Small
                                                                        </div>
                                                                        <div className='col-12 col-md-9' style={{ fontWeight: 'bold' }}>
                                                                            <HeightAndDia55 height={height5} setheight={setheight5} dia={dia5} setdia={setdia5} />
                                                                        </div>
                                                                    </div>
                                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* <input type="text" style={{ border: '1px solid black', paddingLeft: '5px', borderRadius: '5px', height: '25px' }} /> */}
                            </div>
                            <div style={{ marginBottom: '10px', display: 'flex' }}>
                                <div style={{ fontWeight: 'bold', width: '30%' }}>Price: </div>
                                <b>₹ </b><input
                                    onChange={(event: any) => {
                                        setprice(event.target.value)
                                    }}
                                    type="text" style={{ border: '1px solid black', marginLeft: '5px', paddingLeft: '5px', borderRadius: '5px', height: '25px' }} />
                            </div>
                            <div style={{ marginBottom: '10px', display: 'flex' }}>
                                <div style={{ fontWeight: 'bold', width: '30%' }}>Category: </div>
                                <div style={{ width: '50%' }}>
                                    <select
                                        name="cars"
                                        id="cars"
                                        value={selectedCategory}
                                        style={{ border: '1px solid black', borderRadius: '5px', width: '100%' }}
                                        onChange={(event) => {
                                            setSelectedCategory(event.target.value);
                                        }}
                                    >
                                        <option value="ceramic_pots">Ceramic Pots</option>
                                        <option value="ceramic_crockery">Ceramic Crockery</option>
                                        <option value="ceramic_defuser">Ceramic Defuser (Burner)</option>
                                        <option value="ceramic_vase">Ceramic Vase (Flower Pot)</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ marginBottom: '10px', display: 'flex' }}>
                                <div style={{ fontWeight: 'bold', width: '44%' }}>Upload Image: </div>
                                {/* <UploadImage /> */}
                                {/* <input multiple className="form-control" type="file" id="formFile" /> */}
                                {/* <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileList.length >= 4 ? null : uploadButton}
                            </Upload>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )} */}
                                <input type="file" name="photos" onChange={handleChange2} multiple />
                            </div>
                            <br />
                            {(!sku || !name || !price || !height1 || !dia1 || !file) && (
                                <div style={{ color: 'red', fontSize: '13px', textAlign: 'center' }}>!! Some Fields are missing !!</div>
                            )}
                            <br />
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    type="submit"
                                    className="btn btn-outline-warning"
                                    data-bs-dismiss="modal"
                                    style={{ marginRight: '10px' }}
                                    disabled={!sku || !name || !price || !height1 || !dia1 || !file}
                                >
                                    Add Product
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-info"
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                        setsku('');
                                        setname('');
                                        setSelectedPieceSet('1_piece_set');
                                        setheight1('');
                                        setheight2('');
                                        setheight3('');
                                        setheight4('');
                                        setheight5('');
                                        setdia1('');
                                        setdia2('');
                                        setdia3('');
                                        setdia4('');
                                        setdia5('');
                                        setprice('');
                                        setSelectedCategory('ceramic_pots');
                                        setFile('');
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    </>
}

export default AddItemDetails;
