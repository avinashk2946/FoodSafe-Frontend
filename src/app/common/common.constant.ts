export const GLOBAL_PROPERTIES = Object.freeze({
    BASE_API_URL: 'http://18.191.2.115:3000/',
    FE_SESSIONID_PREFIX: 'ECOM',
    REQUEST_TIMEOUT: 60,
    CHANNEL: 'ANDROID',
    CLIENTID: '11'
});

export const API_ACTIONS = Object.freeze({
    login: {
        loginUser: 'user/login',
        fetchConfig: 'fetchConfig.json',
        verifyOtp: 'ecomVerifyOtp.action',
        verifymPin: 'ecomVerifyMpin.action',
        verifyEmail: 'resetPassword/verifyEmail/:email',
        resetPassword: 'resetPasswordByToken',
        forgotpassword:'forgotpassword'

    },
    summary: {
        savecardsInitiate: 'encryptedEcomStoredCards.action',
        doTransaction: 'ecomDoTxn.action'
    },
    configuration: {
        loginConfig: 'config',
        userConfig: 'userConfig',
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
    raw_material: {
        plant: 'plant',
        record: 'record',
        supplier: 'supplier',
        broker: 'broker',
        product: 'product',
        samplepreparation: 'SamplePreparation',
        rawmaterial: 'rawMaterial',
        recorddelete: 'deleterecordList',
    }
});
