import React from "react";

// Función para dividir el contenido del CV en secciones
const parseCV = (text) => {
  const sections = {
    personalInfo: "",
    experience: "",
    education: "",
    skills: "",
    languages: "",
  };

  let currentSection = "";
  const lines = text.split("\n");

  lines.forEach((line) => {
    if (line.toLowerCase().includes("experiencia")) {
      currentSection = "experience";
    } else if (line.toLowerCase().includes("educación")) {
      currentSection = "education";
    } else if (line.toLowerCase().includes("habilidades")) {
      currentSection = "skills";
    } else if (line.toLowerCase().includes("idiomas")) {
      currentSection = "languages";
    } else if (!currentSection && line.trim()) {
      sections.personalInfo += line + "\n";
    } else if (currentSection && line.trim()) {
      sections[currentSection] += line + "\n";
    }
  });

  return sections;
};

// Datos de ejemplo para las previsualizaciones
const sampleData = {
  personalInfo:
    "Juan Pérez\nDesarrollador Full Stack\njuan@email.com\n+34 123 456 789\nMadrid, España",
  experience:
    "Senior Developer - Tech Corp\n2018 - Presente\n• Lideré el desarrollo de aplicaciones web\n• Optimicé el rendimiento del sitio en un 40%\n\nWeb Developer - Digital Solutions\n2015 - 2018\n• Desarrollé interfaces de usuario responsivas\n• Colaboré en más de 15 proyectos exitosos",
  education:
    "Máster en Ingeniería de Software\nUniversidad Técnica - 2015\n\nGrado en Informática\nUniversidad Nacional - 2013",
  skills:
    "• JavaScript (React, Node.js)\n• Python\n• SQL y NoSQL\n• AWS\n• Docker",
  languages: "Español - Nativo\nInglés - Profesional\nFrancés - Básico",
};

// Estilos predeterminados para cada plantilla
export const templateStyles = {
  minimalista: {
    name: "Minimalista",
    previewImage: "/placeholder.svg?height=200&width=150",
    styles: [
      {
        name: "Clásico",
        font: "font-sans",
        color: "text-gray-800",
        accentColor: "border-gray-600",
      },
      {
        name: "Moderno",
        font: "font-sans",
        color: "text-blue-900",
        accentColor: "border-blue-700",
      },
      {
        name: "Elegante",
        font: "font-serif",
        color: "text-gray-900",
        accentColor: "border-gray-500",
      },
    ],
  },
  creativo: {
    name: "Creativo",
    previewImage: "/CreativoResumeCV.webp",
    styles: [
      {
        name: "Vibrante",
        font: "font-sans",
        color: "text-purple-800",
        accentColor: "bg-purple-100",
      },
      {
        name: "Artístico",
        font: "font-sans",
        color: "text-green-800",
        accentColor: "bg-green-100",
      },
      {
        name: "Innovador",
        font: "font-sans",
        color: "text-pink-800",
        accentColor: "bg-pink-100",
      },
    ],
  },
  corporativo: {
    name: "Corporativo",
    previewImage: "/placeholder.svg?height=200&width=150",
    styles: [
      {
        name: "Ejecutivo",
        font: "font-sans",
        color: "text-blue-900",
        accentColor: "bg-blue-800",
      },
      {
        name: "Profesional",
        font: "font-serif",
        color: "text-green-900",
        accentColor: "bg-green-800",
      },
      {
        name: "Empresarial",
        font: "font-sans",
        color: "text-indigo-900",
        accentColor: "bg-indigo-800",
      },
    ],
  },
  tecnologico: {
    name: "Tecnológico",
    previewImage: "/placeholder.svg?height=200&width=150",
    styles: [
      {
        name: "Digital",
        font: "font-mono",
        color: "text-blue-600",
        accentColor: "border-blue-500",
      },
      {
        name: "Futurista",
        font: "font-sans",
        color: "text-indigo-600",
        accentColor: "border-indigo-500",
      },
      {
        name: "Técnico",
        font: "font-mono",
        color: "text-cyan-600",
        accentColor: "border-cyan-500",
      },
    ],
  },
};

export const MinimalistaTemplate = ({ content, style }) => {
  const sections = content ? parseCV(content) : sampleData;
  const { font, color, accentColor } = style;

  return (
    <div className={`p-8 max-w-2xl mx-auto bg-white shadow-lg ${font}`}>
      <div className={`border-b-2 mb-6 ${accentColor}`}>
        <div className={`text-3xl font-bold mb-2 ${color}`}>
          {sections.personalInfo.split("\n")[0]}
        </div>
        <div className="text-gray-600 mb-4">
          {sections.personalInfo
            .split("\n")
            .slice(1)
            .map((info, index) => (
              <div key={index}>{info}</div>
            ))}
        </div>
      </div>

      {Object.entries(sections).map(([key, value]) => {
        if (key !== "personalInfo" && value.trim()) {
          return (
            <div key={key} className="mt-6">
              <h2 className={`text-xl font-semibold mb-3 ${color}`}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </h2>
              <div className="text-gray-700 whitespace-pre-line">
                {value.split("\n").map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export const CreativoTemplate = ({ content, style }) => {
  const sections = content ? parseCV(content) : sampleData;
  const { font, color, accentColor } = style;

  return (
    <div className={`p-8 max-w-2xl mx-auto bg-white shadow-lg grid grid-cols-3 gap-6 ${font}`}>
      <div className={`col-span-1 p-4 rounded-lg ${accentColor}`}>
        <div className={`text-2xl font-bold mb-4 ${color}`}>
          {sections.personalInfo.split("\n")[0]}
        </div>
        <div className="text-sm text-gray-600 mb-6">
          {sections.personalInfo
            .split("\n")
            .slice(1)
            .map((info, index) => (
              <div key={index}>{info}</div>
            ))}
        </div>

        {sections.skills && (
          <div className="mb-6">
            <h2 className={`text-lg font-semibold mb-2 ${color}`}>
              Habilidades
            </h2>
            <div className="text-sm">
              {sections.skills.split("\n").map((skill, index) => (
                <div key={index}>{skill}</div>
              ))}
            </div>
          </div>
        )}

        {sections.languages && (
          <div>
            <h2 className={`text-lg font-semibold mb-2 ${color}`}>
              Idiomas
            </h2>
            <div className="text-sm">
              {sections.languages.split("\n").map((language, index) => (
                <div key={index}>{language}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="col-span-2 p-4">
        {sections.experience && (
          <div className="mb-6">
            <h2 className={`text-xl font-semibold mb-3 ${color}`}>
              Experiencia
            </h2>
            <div className="text-gray-700 whitespace-pre-line">
              {sections.experience.split("\n").map((exp, index) => (
                <div key={index}>{exp}</div>
              ))}
            </div>
          </div>
        )}

        {sections.education && (
          <div>
            <h2 className={`text-xl font-semibold mb-3 ${color}`}>
              Educación
            </h2>
            <div className="text-gray-700 whitespace-pre-line">
              {sections.education.split("\n").map((edu, index) => (
                <div key={index}>{edu}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CorporativoTemplate = ({ content, style }) => {
  const sections = content ? parseCV(content) : sampleData;
  const { font, color, accentColor } = style;

  return (
    <div className={`max-w-2xl mx-auto bg-white shadow-lg ${font}`}>
      <div className={`p-6 ${accentColor}`}>
        <div className={`text-3xl font-bold text-white mb-2`}>
          {sections.personalInfo.split("\n")[0]}
        </div>
        <div className="text-white opacity-90">
          {sections.personalInfo
            .split("\n")
            .slice(1)
            .map((info, index) => (
              <div key={index}>{info}</div>
            ))}
        </div>
      </div>

      <div className="p-8">
        {Object.entries(sections).map(([key, value]) => {
          if (key !== "personalInfo" && value.trim()) {
            return (
              <div key={key} className="mb-6">
                <h2 className={`text-xl font-semibold mb-3 flex items-center ${color}`}>
                  <span className="mr-2">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <div className={`flex-grow h-px ${accentColor}`}></div>
                </h2>
                <div className="text-gray-700 whitespace-pre-line">
                  {value.split("\n").map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export const TecnologicoTemplate = ({ content, style }) => {
  const sections = content ? parseCV(content) : sampleData;
  const { font, color, accentColor } = style;

  return (
    <div className={`max-w-2xl mx-auto bg-gray-100 p-8 ${font}`}>
      <div className="bg-white shadow-lg p-6 mb-6 rounded-lg">
        <div className={`text-3xl font-bold mb-2 ${color}`}>
          {sections.personalInfo.split("\n")[0]}
        </div>
        <div className="text-gray-600">
          {sections.personalInfo
            .split("\n")
            .slice(1)
            .map((info, index) => (
              <div key={index}>{info}</div>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {Object.entries(sections).map(([key, value]) => {
          if (key !== "personalInfo" && value.trim()) {
            return (
              <div key={key} className="bg-white shadow-lg p-6 rounded-lg">
                <h2 className={`text-xl font-semibold mb-3 pb-2 border-b-2 ${color} ${accentColor}`}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h2>
                <div className="text-gray-700 whitespace-pre-line">
                  {value.split("\n").map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default function Component() {
  return (
    <div className="space-y-12 p-8">
      <h1 className="text-3xl font-bold mb-6">CV Templates Preview</h1>
      {Object.entries(templateStyles).map(([templateId, template]) => (
        <div key={templateId} className="space-y-4">
          <h2 className="text-2xl font-semibold">{template.name}</h2>
          {template.styles.map((style, index) => {
            const TemplateComponent = {
              minimalista: MinimalistaTemplate,
              creativo: CreativoTemplate,
              corporativo: CorporativoTemplate,
              tecnologico: TecnologicoTemplate,
            }[templateId];

            return (
              <div key={index} className="border p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-2">{style.name}</h3>
                <TemplateComponent content={null} style={style} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}