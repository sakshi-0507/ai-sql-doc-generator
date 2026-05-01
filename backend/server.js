const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// app.post('/generate-doc', async (req, res) => {
//     try {
//         const { schema } = req.body;

//         const prompt = `
//         Convert this SQL schema into clean documentation.

//         ${schema}

//         Give:
//         1. Table description
//         2. Column meanings
//         3. Relationships
//         `;

//         const response = await axios.post(
//             "https://api.openai.com/v1/chat/completions",
//             {
//                 model: "gpt-4o-mini",
//                 messages: [{ role: "user", content: prompt }]
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
//                 }
//             }
//         );

//         res.json({
//             result: response.data.choices[0].message.content
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error generating documentation");
//     }
// });


app.post('/generate-doc', (req, res) => {
    const { schema } = req.body;

    let output = "";

    if (schema.toLowerCase().includes("orders")) {
        output += `
Table: Orders
Description: Stores order details.

Columns:
- order_id: Unique identifier for each order
- customer_id: Links to customers
- total_amount: Total price of the order
`;
    }

    if (schema.toLowerCase().includes("users")) {
        output += `
Table: Users
Description: Stores user information.

Columns:
- user_id: Unique identifier
- name: User name
- email: User email
`;
    }

    if (!output) {
        output = "Basic documentation generated. (AI not connected yet)";
    }

    res.json({ result: output });
});

app.listen(5000, () => console.log("Backend running on port 5000"));