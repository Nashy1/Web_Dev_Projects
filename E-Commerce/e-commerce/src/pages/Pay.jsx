import { useHistory } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from 'react';
import axios from "axios";

const KEY = 'pk_test_51NSLruF7zG3QVgpa7jLFTGlohzu36c1yc5X2cIy5ioYTFTaKGMsSZ7dgLdiiugue2L9gvaEt78DxVb6gvdBe2PTU00ZuAwHKUl';

const Pay = () => {
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory();

    const onToken = (token) => {
        setStripeToken(token);
    }

    useEffect(() => {

        const makeRequest = async () => {
            try {
                const res = await axios.post("http://localhost:3000/api/v1/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: 2000,
                    }
                )
                console.log(res.data);
                history.push('/success');
            } catch (error) {
                console.log("Error has occured in making a request to checkout the payment", error);
            }
        };
        stripeToken && makeRequest();
    }, [stripeToken, history]);

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {stripeToken ? (<span>Processing.. Please Wait...</span>) : (
                <StripeCheckout name="Mark's Shop"
                    image="https://avatars.githubusercontent.com/u/63488797?v=4"
                    billingAddress
                    shippingAddress
                    description='Your total is $20'
                    amount={2000}
                    token={onToken}
                    stripeKey={KEY}
                />
            )}

        </div>
    )
}

export default Pay;