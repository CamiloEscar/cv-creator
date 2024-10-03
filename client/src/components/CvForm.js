import React, { useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const CvForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        experience: '',
        education: '',
        skills: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //asd
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/api/cv', formData);
        generatePDF(response.data);
    };

    const generatePDF = (data) => {
        const element = document.getElementById('cv');
        html2pdf().from(element).save('cv.pdf');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Nombre" onChange={handleChange} />
            <input name="contact" placeholder="Contacto" onChange={handleChange} />
            <textarea name="experience" placeholder="Experiencia" onChange={handleChange} />
            <textarea name="education" placeholder="Educación" onChange={handleChange} />
            <textarea name="skills" placeholder="Habilidades" onChange={handleChange} />
            <button type="submit">Generar CV</button>
            <div id="cv" className="hidden">
                {/* Aquí renderiza el CV basado en formData */}
            </div>
        </form>
    );
};

export default CvForm;
