import React, { useState, useEffect, useRef } from 'react';

const CvForm = () => {
  const [text, setText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState('');
  const [themeColor, setThemeColor] = useState('#000000');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [error, setError] = useState('');
  const abortController = useRef(null);

  const fonts = [
    "Arial",
    "Times New Roman",
    "Helvetica",
    "Verdana",
    "Georgia"
  ];

  const designs = [
    { id: 'minimalista', name: 'Minimalista', description: 'Diseño limpio y sencillo' },
    { id: 'creativo', name: 'Creativo', description: 'Para perfiles creativos' },
    { id: 'corporativo', name: 'Corporativo', description: 'Estilo profesional y formal' },
    { id: 'tecnologico', name: 'Tecnológico', description: 'Enfoque en habilidades técnicas' }
  ];

  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  const generateCV = async () => {
    if (!text.trim()) {
      setError('Por favor, ingresa información para tu CV');
      return;
    }

    setError('');
    setIsGenerating(true);
    setGeneratedText('');

    abortController.current = new AbortController();

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "llama2",
          prompt: `Eres un experto en creación de CVs. Genera un CV profesional en formato ${selectedDesign} usando el estilo de fuente ${selectedFont} y ${themeColor} como color principal. La información del usuario es: ${text}`,
          stream: true,
        }),
        signal: abortController.current.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.trim() === '') continue;
          
          try {
            const { response } = JSON.parse(line);
            if (response) {
              setGeneratedText(prev => prev + response);
            }
          } catch (e) {
            console.error('Error parsing JSON:', e);
          }
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Generación cancelada');
      } else {
        setError(`Error al generar el CV: ${err.message}`);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCancel = () => {
    if (abortController.current) {
      abortController.current.abort();
    }
  };

  const LoadingIndicator = () => (
    <div className="flex items-center space-x-2">
      <div className="animate-pulse text-blue-500">Generando CV</div>
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Generador de CV</h1>
      
      {!selectedDesign ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Selecciona un diseño:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {designs.map(design => (
              <button
                key={design.id}
                className="p-4 border rounded-lg hover:border-blue-500 transition-all"
                onClick={() => setSelectedDesign(design.id)}
              >
                <h3 className="text-lg font-semibold">{design.name}</h3>
                <p className="text-gray-600">{design.description}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Información para tu CV:
            </label>
            <textarea
              className="w-full p-4 border rounded-lg"
              rows="10"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ingresa tu experiencia, educación, habilidades..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Fuente:</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value)}
              >
                {fonts.map(font => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Color:</label>
              <input
                type="color"
                className="w-full h-10 border rounded-lg"
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={generateCV}
              disabled={isGenerating}
              className={`flex-1 p-4 text-white rounded-lg ${
                isGenerating ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isGenerating ? <LoadingIndicator /> : 'Generar CV'}
            </button>
            {isGenerating && (
              <button
                onClick={handleCancel}
                className="p-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Cancelar
              </button>
            )}
          </div>

          {generatedText && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Tu CV Generado:</h2>
              <div 
                className="p-4 border rounded-lg whitespace-pre-wrap"
                style={{ fontFamily: selectedFont }}
              >
                {generatedText}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CvForm;



// import html2pdf from "html2pdf.js";
// const CvForm = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         contact: '',
//         experience: '',
//         education: '',
//         skills: '',
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     //asd
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const response = await axios.post('http://localhost:5000/api/cv', formData);
//         generatePDF(response.data);
//     };

//     const generatePDF = (data) => {
//         const element = document.getElementById('cv');
//         html2pdf().from(element).save('cv.pdf');
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input name="name" placeholder="Nombre" onChange={handleChange} />
//             <input name="contact" placeholder="Contacto" onChange={handleChange} />
//             <textarea name="experience" placeholder="Experiencia" onChange={handleChange} />
//             <textarea name="education" placeholder="Educación" onChange={handleChange} />
//             <textarea name="skills" placeholder="Habilidades" onChange={handleChange} />
//             <button type="submit">Generar CV</button>
//             <div id="cv" className="hidden">
//                 {/* Aquí renderiza el CV basado en formData */}
//             </div>
//         </form>
//     );
// };

// export default CvForm;