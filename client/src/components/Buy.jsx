import React, { useState } from 'react';
import { ethers } from 'ethers';

const Buy = ({ state, contractAddress }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const makePayment = async (event) => {
        event.preventDefault();
        const { contract } = state;

        try {
            const amount = ethers.utils.parseEther('1');
            const paymentId = 'YourPaymentId'; // Replace with a valid payment ID
            const date = Date.now(); // Replace with a valid date

            const transaction = await contract.makePayment(name, message, amount);
            await transaction.wait();
            console.log('Transaction is Successful');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <form onSubmit={makePayment}>
                <div>
                    <input
                        type="text"
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        id="Address"
                        placeholder="Address"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Pay</button>
                </div>
            </form>
        </>
    );
};

export default Buy;
