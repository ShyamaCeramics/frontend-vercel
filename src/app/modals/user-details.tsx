import React, { useEffect, useState } from 'react';

const UserDetails = ({ isLoadingData = true, currentUserData }: any) => {
    const [user, setUser] = useState<any>({});

    useEffect(() => {
        setUser(currentUserData);
    }, [currentUserData]);

    return <>
        <div className="modal" tabIndex={-1} id="users-details-modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{user && user.name} Details</h5>
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
                            user &&
                            <>
                                <div className="modal-body">
                                    Name: {user.id}
                                    <br />
                                    Name: {user.name}
                                    <br />
                                    Name: {user.address}
                                    <br />
                                </div>
                            </>
                    }
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default UserDetails;
