import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from 'react-otp-input';
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "@/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "./navbar";
import { useRouter } from 'next/router';
import jwtDecode from "jwt-decode";
import "../../styles/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { adminRoutes, basePath, userRoutes } from "@/config/configs";
import { callToFetchUserDetails, callToSaveUserDetails } from "@/utils/apis";

const WrapLayout = ({ children }: any) => {
    const router = useRouter();
    const aud_key = 'shyama-dc9e9';
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [isUserLoadingFromLocal, setIsUserLoadingFromLocal] = useState(false);
    const [userName, setUserName] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [isUserAuthorized, setIsUserAuthorized] = useState(false);

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    let recaptchaVerifier: any = null;
    function initializeRecaptchaVerifier() {
        if (!recaptchaVerifier) {
            recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: () => {
                        // Callback function, if needed
                    },
                    "expired-callback": () => {
                        // Expired callback function, if needed
                    },
                }
            );
        }
    }

    function onSignup() {
        setLoading(true);
        initializeRecaptchaVerifier();

        const formatPh = "+" + ph;

        signInWithPhoneNumber(auth, formatPh, recaptchaVerifier)
            .then((confirmationResult) => {
                // @ts-ignore
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success("OTP sent successfully!");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    // Function to handle OTP verification
    function onOTPVerify() {
        setLoading(true);
        // @ts-ignore
        if (window.confirmationResult) {
            // @ts-ignore
            window.confirmationResult
                .confirm(otp)
                .then(async (res: any) => {
                    setUser(res.user);
                    if (res.user) {
                        localStorage.setItem('accessToken', res.user.accessToken);
                        let decodedToken: any = jwtDecode(res.user.accessToken);
                        if (decodedToken.aud === aud_key) {
                            setUser(true);
                            setUserMobile(decodedToken.phone_number ? decodedToken.phone_number : '');
                            fetchUserDetails();
                        } else {
                            setUser(null);
                        }
                    }
                    setLoading(false);
                })
                .catch((err: any) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }

    const fetchUserDetails = async () => {
        setIsUserLoading(true);
        if (!userName) {
            const user_details: any = await callToFetchUserDetails();
            if (user_details) {
                setIsUserAuthorized(true);
                setUserName(user_details.name);
                setUserMobile(user_details.mobile);
                setUserAddress(user_details.address);
                setIsAdmin(user_details.isAdmin);
                if (user_details.isAdmin) {
                    let routePath = window.location.href;
                    routePath = routePath.split(basePath)[1];
                    if (!adminRoutes.includes(routePath)) {
                        router.push('/admin');
                    }
                } else {
                    let routePath = window.location.href;
                    routePath = routePath.split(basePath)[1];
                    if (!userRoutes.includes(routePath)) {
                        router.push('/');
                    }
                }
            }
        }
        setIsUserLoading(false);
    };

    useEffect(() => {
        setIsUserLoadingFromLocal(true);
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            let decodedToken: any = jwtDecode(accessToken);
            if (decodedToken.aud === aud_key) {
                setUser(true);
                setUserMobile(decodedToken.phone_number ? decodedToken.phone_number : '');
                fetchUserDetails();
            } else {
                setUser(null);
            }
        }
        setIsUserLoadingFromLocal(false);
    }, []);

    const onSaveUserDetails = async () => {
        const userDetailsPayload = {
            mobile: userMobile,
            name: userName,
            address: userAddress
        }
        const res = await callToSaveUserDetails(userDetailsPayload, 'user/save');
        if (res) {
            setIsUserAuthorized(true);
        } else {
            setIsUserAuthorized(false);
        }
    };

    const handleInputNameChange = (event: any) => {
        setUserName(event.target.value);
    };
    const handleInputAddressChange = (event: any) => {
        setUserAddress(event.target.value);
    };

    return <>
        {
            user ?
                <>
                    {
                        (isUserLoading || isUserLoadingFromLocal) ?
                            <div style={{ display: 'flex', marginTop: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="spinner-grow text-primary" role="status" />
                                <div className="spinner-grow text-secondary" role="status" />
                                <div className="spinner-grow text-success" role="status" />
                                <div className="spinner-grow text-danger" role="status" />
                                <div className="spinner-grow text-warning" role="status" />
                                <div className="spinner-grow text-info" role="status" />
                                <div className="spinner-grow text-dark" role="status" />
                            </div>
                            :
                            (userName && userMobile && userAddress && isUserAuthorized) ?
                                <>
                                    <Toaster toastOptions={{ duration: 4000 }} />
                                    <Navbar isAdmin={isAdmin} />
                                    <div style={{ width: '100%' }}>
                                        {children}
                                    </div>
                                </>
                                :
                                <section style={{
                                    backgroundColor: '#ebc070'
                                }} className="flex items-center justify-center h-screen">
                                    <div>
                                        <Toaster toastOptions={{ duration: 4000 }} />
                                        <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
                                            <h1 className="text-center leading-normal text-white font-medium text-xl mb-6">
                                                Please save your Name and Address
                                            </h1>
                                            <div style={{ marginBottom: '10px', display: 'flex' }}>
                                                <div style={{ fontWeight: 'bold', width: '30%' }}>Name: </div>
                                                <input
                                                    type="text"
                                                    style={{
                                                        border: '1px solid black',
                                                        paddingLeft: '5px',
                                                        borderRadius: '5px',
                                                        height: '25px'
                                                    }}
                                                    onChange={handleInputNameChange}
                                                />
                                            </div>
                                            <div style={{ marginBottom: '10px', display: 'flex' }}>
                                                <div style={{ fontWeight: 'bold', width: '30%' }}>Address: </div>
                                                <input
                                                    type="text"
                                                    style={{
                                                        border: '1px solid black',
                                                        paddingLeft: '5px',
                                                        borderRadius: '5px',
                                                        height: '25px'
                                                    }}
                                                    onChange={handleInputAddressChange}
                                                />
                                            </div>
                                            <button
                                                onClick={onSaveUserDetails}
                                                className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                                            >
                                                <span>Save Details</span>
                                            </button>
                                        </div>
                                    </div>
                                </section>
                    }
                </>
                :
                (isUserLoading || isUserLoadingFromLocal) ?
                    <div style={{ display: 'flex', marginTop: '25%', justifyContent: 'center', alignItems: 'center' }}>
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
                        <section style={{
                            backgroundColor: '#ebc070'
                        }} className="flex items-center justify-center h-screen">
                            <div>
                                <Toaster toastOptions={{ duration: 4000 }} />
                                <div id="recaptcha-container"></div>
                                <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
                                    <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
                                        Welcome to <br /> Shyama Ceramics
                                    </h1>
                                    {
                                        showOTP ?
                                            <>
                                                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                                                    <BsFillShieldLockFill size={30} />
                                                </div>
                                                <label
                                                    htmlFor="otp"
                                                    className="font-bold text-xl text-white text-center"
                                                >
                                                    Enter your OTP
                                                </label>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <OtpInput
                                                        value={otp}
                                                        onChange={setOtp}
                                                        numInputs={6}
                                                        renderSeparator={<span>-</span>}
                                                        renderInput={(props) => <input {...props} />}
                                                    ></OtpInput>
                                                </div>
                                                <button
                                                    onClick={onOTPVerify}
                                                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                                                >
                                                    {loading && (
                                                        <CgSpinner size={20} className="mt-1 animate-spin" />
                                                    )}
                                                    <span>Verify OTP</span>
                                                </button>
                                            </> : <>
                                                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                                                    <BsTelephoneFill size={30} />
                                                </div>

                                                {/* <video
                                                    controls={true}
                                                    src={"/demoVid.mp4"}
                                                    style={{
                                                        width: '120px',
                                                        marginLeft: '25%'
                                                    }}
                                                /> */}

                                                <label
                                                    htmlFor=""
                                                    className="font-bold text-xl text-white text-center"
                                                >
                                                    Verify your phone number
                                                </label>
                                                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                                                <button
                                                    onClick={onSignup}
                                                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                                                >
                                                    {loading && (
                                                        <CgSpinner size={20} className="mt-1 animate-spin" />
                                                    )}
                                                    <span>Verify Phone Number</span>
                                                </button>
                                            </>
                                    }
                                </div>
                            </div>
                        </section>
                    </>
        }
    </>

};

export default WrapLayout;


