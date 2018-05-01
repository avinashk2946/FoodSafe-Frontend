export const GLOBAL_PROPERTIES = Object.freeze({
    BASE_API_URL: 'http://18.191.2.115:3000/',
    //BASE_API_URL: 'http://localhost:3000/',

    FE_SESSIONID_PREFIX: 'ECOM',
    REQUEST_TIMEOUT: 60,
    CHANNEL: 'ANDROID',
    CLIENTID: '11',
    Company_Id: "5ae44f77f0645c06c8179cce"
});

export const API_ACTIONS = Object.freeze({
    login: {
        loginUser: 'user/login',
        fetchConfig: 'fetchConfig.json',
        verifyOtp: 'ecomVerifyOtp.action',
        verifymPin: 'ecomVerifyMpin.action',
        verifyEmail: 'user/resetPassword/verifyEmail',
        resetPassword: 'user/resetPasswordByToken'
    },
    summary: {
        savecardsInitiate: 'encryptedEcomStoredCards.action',
        doTransaction: 'ecomDoTxn.action'
    },
    configuration: {
        loginConfig: 'config',
        userConfig: 'userConfig',
        dynamicForm: 'dynamicForm'
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
    },
    generic_masters: {
        company: 'company',
        inputTypes: 'inputtype',
        formTypes: 'formtypes',
        unitTypes: 'unittypes',
        validations: 'validations'
    }
});

export const Master_Data = Object.freeze({
    dynamicForm: {
        default: {
            unitTypeName: "Gram",
            validationName: "required",
            inputTypeName: "Text"
        }
    }
})
