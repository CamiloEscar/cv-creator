'use client'

import React, { useState, useEffect, useRef } from 'react'
import { MinimalistaTemplate, CreativoTemplate, CorporativoTemplate, TecnologicoTemplate, templateStyles } from './CvTemplates'

const designs = [
  { id: 'minimalista', name: 'Minimalista', description: 'Diseño limpio y sencillo' },
  { id: 'creativo', name: 'Creativo', description: 'Para perfiles creativos' },
  { id: 'corporativo', name: 'Corporativo', description: 'Estilo profesional y formal' },
  { id: 'tecnologico', name: 'Tecnológico', description: 'Enfoque en habilidades técnicas' }
]

// Componente A4 para previsualización
const A4Preview = ({ children }) => (
  <div className="flex justify-center">
    <div 
      className="w-[210mm] h-[297mm] bg-white shadow-lg"
      style={{
        margin: '0 auto',
      }}
    >
      {children}
    </div>
  </div>
);

// Estilos CSS para impresión y visualización responsiva
const GlobalStyles = () => (
  <style jsx global>{`
    @media screen and (max-width: 210mm) {
      .a4-container {
        transform: scale(0.8);
        transform-origin: top center;
      }
    }
    @media print {
      body * {
        visibility: hidden;
      }
      .cv-preview, .cv-preview * {
        visibility: visible;
      }
      .cv-preview {
        position: absolute;
        left: 0;
        top: 0;
        width: 210mm;
        height: 297mm;
      }
    }
  `}</style>
);

export default function CvForm() {
  const [text, setText] = useState('')
  const [generatedText, setGeneratedText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedDesign, setSelectedDesign] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('content')
  const abortController = useRef(null)

  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort()
      }
    }
  }, [])

  const generateCV = async () => {
    if (!text.trim()) {
      setError('Por favor, ingresa información para tu CV')
      return
    }

    setError('')
    setIsGenerating(true)
    setGeneratedText('')

    abortController.current = new AbortController()

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "llama2",
          prompt: `Eres un experto en creación de CVs. Genera un CV profesional en formato ${selectedDesign} usando el estilo ${selectedStyle}. La información del usuario es: ${text}`,
          stream: true,
        }),
        signal: abortController.current.signal
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        
        for (const line of lines) {
          if (line.trim() === '') continue
          
          try {
            const { response } = JSON.parse(line)
            if (response) {
              setGeneratedText(prev => prev + response)
            }
          } catch (e) {
            console.error('Error parsing JSON:', e)
          }
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Generación cancelada')
      } else {
        setError(`Error al generar el CV: ${err.message}`)
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCancel = () => {
    if (abortController.current) {
      abortController.current.abort()
    }
  }

  const getTemplateComponent = () => {
    const templates = {
      minimalista: MinimalistaTemplate,
      creativo: CreativoTemplate,
      corporativo: CorporativoTemplate,
      tecnologico: TecnologicoTemplate
    }
    return templates[selectedDesign] || MinimalistaTemplate
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <GlobalStyles />
      <h1 className="text-3xl font-bold mb-6 text-center">Generador de CV</h1>
      
      {!selectedDesign ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Selecciona un diseño:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {designs.map(design => (
              <div 
                key={design.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4"
                onClick={() => setSelectedDesign(design.id)}
              >
                <h3 className="text-lg font-semibold mb-2">{design.name}</h3>
                <p className="text-gray-600 mb-4">{design.description}</p>
                <div className="aspect-[1/1.414] relative">
                  <img 
                    src={`/api/placeholder/400/320`}
                    alt={`${design.name} preview`} 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <button 
            onClick={() => setSelectedDesign('')}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver a selección de diseño
          </button>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex border-b">
              <button
                className={`flex-1 py-2 px-4 text-center ${activeTab === 'content' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setActiveTab('content')}
              >
                Contenido
              </button>
              <button
                className={`flex-1 py-2 px-4 text-center ${activeTab === 'style' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setActiveTab('style')}
              >
                Estilo
              </button>
            </div>
            <div className="p-4">
              {activeTab === 'content' && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Información para tu CV</h3>
                  <p className="text-gray-600 mb-4">Ingresa tu experiencia, educación, habilidades y otros detalles relevantes.</p>
                  <textarea
                    className="w-full h-48 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Escribe aquí..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></textarea>
                </div>
              )}
              {activeTab === 'style' && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Personaliza tu CV</h3>
                  <p className="text-gray-600 mb-4">Elige el estilo que mejor se adapte a tu perfil.</p>
                  <select
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                  >
                    <option value="">Selecciona un estilo</option>
                    {templateStyles[selectedDesign].styles.map((style, index) => (
                      <option key={index} value={style.name}>{style.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={generateCV}
              disabled={isGenerating || !selectedStyle}
              className={`flex-1 py-2 px-4 rounded-md text-white ${isGenerating || !selectedStyle ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generando CV...
                </span>
              ) : 'Generar CV'}
            </button>
            {isGenerating && (
              <button
                onClick={handleCancel}
                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancelar
              </button>
            )}
          </div>

          {generatedText && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Tu CV Generado</h3>
              <div className="cv-preview">
                <A4Preview>
                  {React.createElement(getTemplateComponent(), {
                    content: generatedText,
                    style: templateStyles[selectedDesign].styles.find(s => s.name === selectedStyle)
                  })}
                </A4Preview>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}