const express = require('express');
const cors = require('cors');// y3ayt ll frontend 
const app = express();
const PORT = 5000;
app.use(cors());//y5alli l frontend yesta3mel l backend
app.use(express.json());
app.use(express.static('public'));

const services = [
    { id: 1, name: 'Toner Cartridge Refilling', description: 'Professional refilling of powder toner cartridges for all major printer brands.' },
    { id: 2, name: 'Liquid Ink Cartridge Refilling', description: 'Expert refilling of liquid ink cartridges with high-quality inks.' },
    { id: 3, name: 'Custom Cartridge', description: 'Cheaper Cartridges with same quality'}
];
const contacts = [];

app.get('/api/services', (req, res) => {
    res.json(services);
});
app.post('/api/contact' , (req, res) => {
    contacts.push(req.body);
    res.json("wsol");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
