import WrapLayout from '@/app/components/wrap-layout';
import OrderDetails from '@/app/modals/order-details';
import { themeColor } from '@/config/configs';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const apiOrdersData = [
    {
        id: 1,
        name: 'order 1',
        address: 'Ghaziabad',
        status: 'Pending'
    },
    {
        id: 2,
        name: 'order 2',
        address: 'Ghaziabad',
        status: 'Accepted'
    },
    {
        id: 2,
        name: 'order 2',
        address: 'Ghaziabad',
        status: 'Rejected'
    },
    {
        id: 2,
        name: 'order 2',
        address: 'Ghaziabad',
        status: 'Pending'
    }
];

const CartItems = () => {
    const [currentOpenRowId, setCurrentOpenRowId] = useState('');
    const [currentorderData, setCurrentorderData] = useState<any>({});
    const [isLoadingData, setisLoadingData] = useState(true);
    const [isPendingActive, setisPendingActive] = useState(false);
    const [isAcceptedActive, setisAcceptedActive] = useState(false);
    const [isRejectedActive, setisRejectedActive] = useState(false);
    const [ordersData, setordersData] = useState<any>([]);
    const [filteredOrdersData, setFilteredOrdersData] = useState<any>([]);
    const [isLoadingOrdersData, setisLoadingOrdersData] = useState<any>(true);

    useEffect(() => {
        setisLoadingOrdersData(true);
        if (apiOrdersData && apiOrdersData.length > 0) {
            setordersData(apiOrdersData);
            setFilteredOrdersData(apiOrdersData);
        }
        setisLoadingOrdersData(false);
    }, [apiOrdersData]);

    useEffect(() => {
        setisLoadingOrdersData(true);
        const pendingOrders = ordersData && ordersData.filter((item: any) => item.status === 'Pending');
        const acceptedOrders = ordersData && ordersData.filter((item: any) => item.status === 'Accepted');
        const rejectedOrders = ordersData && ordersData.filter((item: any) => item.status === 'Rejected');
        if (isPendingActive) setFilteredOrdersData(pendingOrders);
        else if (isAcceptedActive) setFilteredOrdersData(acceptedOrders);
        else if (isRejectedActive) setFilteredOrdersData(rejectedOrders);
        else setFilteredOrdersData(apiOrdersData);
        setisLoadingOrdersData(false);
    }, [isPendingActive, isAcceptedActive, isRejectedActive]);

    useEffect(() => {
        setisLoadingData(true);
        const currentModalorderData = ordersData && ordersData.filter((order: any) => order.id === currentOpenRowId);
        setCurrentorderData(currentModalorderData[0]);
        setisLoadingData(false);
    }, [currentOpenRowId]);

    return <WrapLayout>
        <>
            <OrderDetails
                isLoadingData={isLoadingData}
                currentOrderData={currentorderData}
            />
            <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Cart Details</h3>
            <Card style={{ margin: '2%' }}>
                {
                    isLoadingOrdersData ?
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
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrdersData && filteredOrdersData.map((order: any, index: any) => {
                                    return <tr key={index} onClick={() => {
                                        setCurrentOpenRowId(order.id);
                                    }}
                                        data-bs-toggle="modal" data-bs-target="#orders-details-modal"
                                    >
                                        <th scope="row">{order.id}</th>
                                        <td>{order.name}</td>
                                        <td>Otto</td>
                                        <td>{order.address}</td>
                                        <td>{order.status}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                }
            </Card>
        </>
    </WrapLayout>
}

export default CartItems;
