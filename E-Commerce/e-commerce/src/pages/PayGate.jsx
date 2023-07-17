import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import CryptoJS from 'crypto-js';

const KEY = 'pk_test_51NSLruF7zG3QVgpa7jLFTGlohzu36c1yc5X2cIy5ioYTFTaKGMsSZ7dgLdiiugue2L9gvaEt78DxVb6gvdBe2PTU00ZuAwHKUl';

const Pay = () => {
    const history = useHistory();
    const [message, setMessage] = useState('');

    const generateMD5 = (obj, secret = 'secret') => {
        let str = ''
        for (let val in obj) {
            str += obj[val]
        }

        str += secret

        return CryptoJS.MD5(str).toString()
    }

    useEffect(() => {

        const makeRequest = async () => {

            var data = {
                PAYGATE_ID: 10011072130,
                REFERENCE: "pgtest_123456789",
                AMOUNT: 123,
                CURRENCY: 'ZAR',
                RETURN_URL: window.location.href,
                TRANSACTION_DATE: new Date().toISOString(),
                LOCALE: 'en-za',
                COUNTRY: 'ZAF',
                EMAIL: "mark1drinkwater@gmail.com",
            }
            const CHECKSUM = generateMD5(data)

            axios.post('https://secure.paygate.co.za/payweb3/initiate.trans', 
            { 
                ...data, CHECKSUM 
            })
            .then(message => console.log(message))
            .catch(error => console.log(error))
        };
        makeRequest();
    }, []);

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
        </div>
    )
}

export default Pay;