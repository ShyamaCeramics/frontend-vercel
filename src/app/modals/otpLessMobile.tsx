import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';

const OtpLessMobile = ({ setUser, setUserMobile }: any) => {
    useEffect(() => {
        if (window && typeof window != 'undefined') {
            const tempWindow: any = window;
            tempWindow.otpless = (otplessUser: any) => {
                if (otplessUser) {
                    localStorage.setItem('accessToken', otplessUser.idToken);
                    let decodedToken: any = jwtDecode(otplessUser.idToken);
                    if (decodedToken.phone_number_verified) {
                        setUser(true);
                        setUserMobile(decodedToken.phone_number ? decodedToken.phone_number : '');
                    } else {
                        setUser(null);
                    }
                    window.location.reload();
                }
            };
        }
    }, []);

    return <>
        <div className="modal" tabIndex={-1} id="otpless-details-modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content" style={{ backgroundColor: 'transparent', border: 'none' }}>
                    <script
                        id="otpless-sdk"
                        type="text/javascript"
                        src="https://otpless.com/v2/auth.js"
                        data-appid="N67E78OHCYCOR3DU3RIQ"
                    ></script>
                    <div id='otpless-login-page'></div>
                </div>
            </div>
        </div>
    </>
}

export default OtpLessMobile;
