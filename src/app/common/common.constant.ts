
export const GLOBAL_PROPERTIES = Object.freeze({
    BASE_API_URL: 'http://10.56.110.174:7001/mobgw2/',
    FE_SESSIONID_PREFIX: 'ECOM',
    REQUEST_TIMEOUT: 60,
    CHANNEL: 'ANDROID'
});

export const API_ACTIONS = Object.freeze({
    login: {
        initiateEcom: 'initiateEcom.action',
        sendOtp: 'ecomSendOtp.action',
        verifyOtp: 'ecomVerifyOtp.action',
        verifymPin: 'ecomVerifyMpin.action'
    },
    summary: {
        savecardsInitiate: 'encryptedEcomStoredCards.action',
        doTransaction: 'ecomDoTxn.action'
    },
    common: {
        getHash: 'getEcomHash.action',
        doCancel: 'ecomDoCancel.action'
    },
    mPin: {
        verifyUserDetails: 'ecomResetMpin.action',
        changeMpin: 'ecomChangeMpin.action'
    },
    register: {
        registerUser: 'ecomRegisterUser.action'
    },
});