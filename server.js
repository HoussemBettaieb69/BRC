//express declarations
//const express = require('express');
//const cors = require('cors');// y3ayt ll frontend 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
const app = express();
const PORT = 5000;
app.use(cors());//y5alli l frontend yesta3mel l backend
app.use(express.json());
app.use(express.static('public'));
//mongoDB declarations
dotenv.config({path : 'C:/Users/henit/OneDrive/Desktop/prog/BRC/mongopassword.env'});
const client = new MongoClient(process.env.MONGO_URI);
let servicesCollection;
let contactsCollection;

async function connectDB() {
    try {
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        servicesCollection = db.collection('services');
        contactsCollection = db.collection('contacts');
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}
//express 

app.get('/api/services',async (req, res) => {
    const services = await servicesCollection.find({}).toArray();
    res.json(services);
});
app.post('/api/contact', async (req, res) => {
    try {
        const contact = req.body;
        const result = await contactsCollection.insertOne(contact);
        console.log('Inserted contact with _id:', result.insertedId);
        res.json({ message: 'wsol', id: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to insert contact' });
    }
});

app.get('/api/contacts', async (req, res) => {
    const contacts = await contactsCollection.find({}).toArray();
    res.json(contacts);
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});


