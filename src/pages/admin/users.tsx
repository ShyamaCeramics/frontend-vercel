import WrapLayout from '@/app/components/wrap-layout';
import UserDetails from '@/app/modals/user-details';
import { themeColor } from '@/config/configs';
import { callToFetchAllUsers } from '@/utils/apis';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';


const UsersList = () => {
    const [currentOpenRowId, setCurrentOpenRowId] = useState('');
    const [currentUserData, setCurrentUserData] = useState<any>({});
    const [isLoadingData, setisLoadingData] = useState(true);
    const [usersData, setUsersData] = useState([]);
    const [isLoadingUsersData, setIsLoadingUsersData] = useState(true);

    const fetchUsersData = async () => {
        setIsLoadingUsersData(true);
        const apiOrdersData = await callToFetchAllUsers();
        if (apiOrdersData && apiOrdersData.data && apiOrdersData.data.length > 0) {
            setUsersData(apiOrdersData.data);
        }
        setIsLoadingUsersData(false);
    };

    useEffect(() => {
        fetchUsersData();
    }, []);

    useEffect(() => {
        setisLoadingData(true);
        const currentModalUserData = usersData && usersData.filter((user: any) => user.id === currentOpenRowId);
        setCurrentUserData(currentModalUserData[0]);
        setisLoadingData(false);
    }, [currentOpenRowId]);

    return <WrapLayout>
        <>
            <UserDetails
                isLoadingData={isLoadingData}
                currentUserData={currentUserData}
            />
            <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Users Details</h3>
            <Card style={{ margin: '2%' }}>
                {
                    isLoadingUsersData ?
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
                        <table className="table table-hover">
                            <thead style={{ backgroundColor: themeColor }}>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone No.</th>
                                    <th scope="col">Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersData && usersData.map((user: any, index) => {
                                    return <tr key={index} onClick={() => {
                                        setCurrentOpenRowId(user.id);
                                    }}
                                        data-bs-toggle="modal" data-bs-target="#users-details-modal"
                                    >
                                        <th scope="row">{user.id}</th>
                                        <td>{user.name}</td>
                                        <td>{user.mobile}</td>
                                        <td>{user.address}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                }
            </Card>
        </>
    </WrapLayout>
}

export default UsersList;
