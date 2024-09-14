import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/index.css";
import logoImg from '../../assets/images/logo.jpg';
import logo2Img from '../../assets/images/logo-2.jpg';
import { FaInstagramSquare, FaPhone } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLocationDot, FaSquareWhatsapp } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import UpdateUserDetails from '../modals/update-ser-details';

interface NavbarProps {
    isAdmin: boolean;
}

const Navbar = ({ isAdmin }: NavbarProps) => {
    return <>
        <UpdateUserDetails />
        <nav
            className="navbar navbar-expand-lg bg-body-tertiary navbar-custom important-background"
            style={{ paddingBottom: '10px' }}
        >
            <div className="container-fluid">
                <div className="row" style={{ width: '100%', textAlign: 'center' }}>
                    <div className="col-sm-12 col-xs-12 col-12 col-md-4">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Image src={logo2Img} alt="Bootstrap" width="100" height="50" />
                            <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>Shyama Ceramics</span>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xs-12 col-12 col-md-3">
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: '21px',
                            fontSize: '13px',
                            textAlign: 'left'
                        }}>
                            <div><span style={{ fontWeight: 'bold' }}>Dipanshu: </span>+91 9045361969</div>
                            <div><span style={{ fontWeight: 'bold' }}>Sunil Saini: </span>+91 9756276037</div>
                            <div><span style={{ fontWeight: 'bold' }}>Vipin Saini: </span>+91 7906563496</div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xs-12 col-12 col-md-5">
                        <div style={{ display: 'flex', marginTop: '21px' }}>
                            <FaLocationDot style={{ fontSize: '20px', color: 'blue' }} />
                            <div>Shyama ceramics, Nagla Kothi, Munda Kheda Road, Khurja, Bulandshahr 203131</div>
                        </div>
                    </div>
                </div >
            </div >
        </nav >
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-custom">
            <div className="container-fluid">
                <a className="navbar-brand" href={isAdmin ? "/admin/" : "/"}>
                    <Image src={logoImg} alt="Bootstrap" width="70" height="30" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href={isAdmin ? "/admin/" : "/"}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href={isAdmin ? "/admin/orders" : "/orders"}>Orders</a>
                        </li>
                        {isAdmin &&
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/admin/users">Users</Link>
                            </li>
                            // :
                            // <li className="nav-item">
                            //     <a className="nav-link active" aria-current="page" href="/cart">Cart</a>
                            // </li>
                        }
                    </ul>
                    <form style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', width: '130px', justifyContent: 'space-between', marginRight: '20px' }}>
                            <a href="https://www.instagram.com/shyamaceramicpots?igsh=MWdlN3hjbjY2OTQ4aQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                                <FaInstagramSquare style={{ fontSize: '28px', color: '#E4405F' }} />
                            </a>
                            <a href="https://www.facebook.com/shyamaceramicpots" target="_blank" rel="noopener noreferrer">
                                <FaFacebookSquare style={{ fontSize: '28px', color: '#3b5998' }} />
                            </a>
                            <a href="https://wa.me/message/REFXNATUVTUOB1" target="_blank" rel="noopener noreferrer">
                                <FaSquareWhatsapp style={{ fontSize: '28px', color: 'green' }} />
                            </a>
                            <a href="https://maps.app.goo.gl/ajST7B19SZ1qtwHg8" target="_blank" rel="noopener noreferrer">
                                <FaLocationDot style={{ fontSize: '28px', color: '#FF0000' }} />
                            </a>
                            <span>
                                <IoSettings
                                    style={{ fontSize: '28px', color: 'grey' }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#update-user-details-modal"
                                />
                            </span>
                        </div>
                        {isAdmin &&
                            <button className="btn btn-outline-success" type="button" onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}>Sign out</button>}
                    </form>
                </div>
            </div>
        </nav>
    </>
}

export default Navbar;
