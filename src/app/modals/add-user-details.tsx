import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const AddUserDetails = ({ open, setOpen }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                title="Add User Details"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Save Details'
            >
                <div style={{ marginBottom: '10px', display: 'flex' }}>
                    <div style={{ fontWeight: 'bold', width: '30%' }}>Name: </div>
                    <input type="text" style={{ border: '1px solid black', paddingLeft: '5px', borderRadius: '5px', height: '25px' }} />
                </div>
                <div style={{ marginBottom: '10px', display: 'flex' }}>
                    <div style={{ fontWeight: 'bold', width: '30%' }}>Address: </div>
                    <input type="text" style={{ border: '1px solid black', paddingLeft: '5px', borderRadius: '5px', height: '25px' }} />
                </div>
            </Modal>
        </>
    );
};

export default AddUserDetails;
