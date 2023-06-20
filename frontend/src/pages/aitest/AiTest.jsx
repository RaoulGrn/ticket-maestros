import React, { useState } from 'react';

const MyComponent = () => {
    const [words, setWords] = useState([]);
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();


        const url = 'https://api.example.com/descriptions';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ words }),
        });

        if (response.ok) {

            const payload = await response.json();

            setDescription(payload.description);


        } else {

            console.error('Error:', response.status);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={words.join(' ')}
                    onChange={(e) => setWords(e.target.value.split(' '))}
                />
                <button type="submit">Submit</button>
            </form>
            <p>Generated Description: {description}</p>
        </div>
    );
};

export default MyComponent;