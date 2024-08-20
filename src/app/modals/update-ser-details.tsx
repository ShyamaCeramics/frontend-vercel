import { callToFetchUserDetails, callToSaveUserDetails } from '@/utils/apis';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from "react-hot-toast";

const UpdateUserDetails = () => {
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [userName, setUserName] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [userAddress, setUserAddress] = useState('');

    const callToFetchUserData = async () => {
        setIsLoadingData(true);
        const user_details: any = await callToFetchUserDetails();
        if (user_details) {
            setUserName(user_details.name);
            setUserMobile(user_details.mobile);
            setUserAddress(user_details.address);
        }
        setIsLoadingData(false);
    };

    useEffect(() => {
        callToFetchUserData();
    }, []);

    const handleInputNameChange = (event: any) => {
        setUserName(event.target.value);
    };
    const handleInputAddressChange = (event: any) => {
        setUserAddress(event.target.value);
    };

    const handleSubmit = async () => {
        const userDetailsPayload = {
            mobile: userMobile,
            name: userName,
            address: userAddress
        }
        const res = await callToSaveUserDetails(userDetailsPayload, 'user/save');
    };

    return <>
        <div className="modal" tabIndex={-1} id="update-user-details-modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update User Details</h5>
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
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div style={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div style={{ marginBottom: '10px', display: 'flex' }}>
                                                <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Mobile: </span>
                                                <input
                                                    type="text"
                                                    value={userMobile}
                                                    style={{
                                                        border: '1px solid black',
                                                        paddingLeft: '5px',
                                                        borderRadius: '5px',
                                                        height: '25px',
                                                        width: '60%',
                                                        backgroundColor: 'lightgray'
                                                    }}
                                                    disabled={true}
                                                />
                                            </div>
                                            <div style={{ marginBottom: '10px', display: 'flex' }}>
                                                <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Name: </span>
                                                <input
                                                    type="text"
                                                    style={{
                                                        border: '1px solid black',
                                                        paddingLeft: '5px',
                                                        borderRadius: '5px',
                                                        height: '25px',
                                                        width: '60%'
                                                    }}
                                                    value={userName}
                                                    onChange={handleInputNameChange}
                                                />
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Address: </span>
                                                <input
                                                    type="text"
                                                    style={{
                                                        border: '1px solid black',
                                                        paddingLeft: '5px',
                                                        borderRadius: '5px',
                                                        height: '25px',
                                                        width: '60%'
                                                    }}
                                                    value={userAddress}
                                                    onChange={handleInputAddressChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                    }
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-warning"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default UpdateUserDetails;
