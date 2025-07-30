
# 🤖 Módulo de Agente Autónomo con Flujos - Análisis de Texto con Gemini AI

Este módulo forma parte del sistema `ExposIA`, y representa una extensión **individual** orientada a la integración de un **agente inteligente autónomo** que ejecuta un flujo completo de análisis de texto. El agente orquesta automáticamente consultas a otros microservicios y procesa los datos usando **Gemini (Google Generative AI)**.

---

## 🚀 Funcionalidad General

El flujo automatizado consta de 3 pasos principales:

1. **Recepción del texto** enviado por el usuario vía endpoint (`respuesta-analizada`).
2. **Procesamiento del texto con Gemini AI** vía API para generar una evaluación académica.
3. **Persistencia de los resultados** en la base de datos del microservicio.

---

## 📐 Justificación Técnica del Flujo

El agente recibe el texto desde un endpoint en el módulo `recomendaciones`, lo envía al agente autónomo en `practicas-ts`, que realiza el análisis con Gemini y **guarda el resultado de vuelta** en el microservicio `recomendaciones`, cumpliendo así con:

- ✅ Activación mediante endpoint externo.
- ✅ Consumo de un microservicio diferente al propio.
- ✅ Proceso con LLM.
- ✅ Persistencia de resultado mediante un endpoint POST.

---

## 🧱 Estructura del Proyecto (Recomendaciones)

```bash
recomendaciones/
├── src/
│   └── respuesta/
│       ├── dto/
│       │   ├── enviar-texto.dto.ts
│       │   └── create-respuesta.dto.ts
│       ├── entities/
│       │   └── respuesta.entity.ts
│       ├── respuesta.controller.ts
│       ├── respuesta.module.ts
│       └── respuesta.service.ts
```

## 🧱 Estructura del Proyecto (Agente - practicas-ts)

```bash
practicas-ts/
├── src/
│   ├── controllers/
│   │   ├── conversacion-ia.controller.ts
│   ├── services/
│   │   ├── conversacion-ia.service.ts
│   ├── modules/
│   │   └── conversacion-ia.module.ts
│   ├── dtos/
│   │   └── consulta.dto.ts

---

## 📌 Endpoints del Sistema

### 1. `POST /respuesta-analizada` (en módulo `recomendaciones`)
Inicia el flujo completo del agente. Este endpoint:

- Recibe el texto original.
- Llama al módulo del agente (`/v1/start-analysis-agent`).
- Recibe la evaluación de IA.
- Guarda la respuesta en la base de datos.

📍 Ejemplo de llamada:
```json
POST http://localhost:4000/respuesta-analizada

{
  "texto": "Hoy quiero que recordemos una palabra que a veces olvidamos: propósito..."
}
```

---

### 2. `POST /v1/start-analysis-agent` (en módulo `practicas-ts`)
Endpoint de activación del agente autónomo. Se encarga de:

- Recibir el texto.
- Enviarlo a Gemini API.
- Retornar la respuesta procesada.

📍 Ejemplo de respuesta:
```json
{
  "pregunta": "Texto enviado...",
  "respuesta_ia": "Evaluación académica con sugerencias...",
  "estado": "ok"
}
```

---

## ⚙️ Variables de Entorno `.env`

```env
GEMINI_API_KEY=sk-xxxxxxx
GEMINI_MODEL=models/gemini-pro
PROMPT_REVISION_BASE=Evalúa el siguiente texto motivacional según criterios académicos y da sugerencias de mejora.
```

---

## 🧪 Pruebas y Simulación

Puedes usar **Postman** para realizar pruebas de integración:

- `POST http://localhost:4000/respuesta-analizada` → dispara todo el flujo.
- `GET http://localhost:4000/respuestas` → revisa si se guardó correctamente.

---

## 📦 Instalación y Ejecución

### Recomendaciones
```bash
cd recomendaciones
npm install
npm run start:dev
```

### Agente (practicas-ts)
```bash
cd practicas-ts
npm install
npm run start:dev
```

---

## ✅ Requisitos Cumplidos del Proyecto Extra

| Requisito                                     | Estado   |
|----------------------------------------------|----------|
| Endpoint de activación RESTful               | ✅        |
| Flujo con al menos 3 pasos lógicos           | ✅        |
| Uso de un modelo LLM (Gemini)                | ✅        |
| Consumo de otro microservicio                | ✅        |
| Persistencia final del resultado             | ✅        |
| Separación de responsabilidades              | ✅        |
| Documentación clara (README)                 | ✅        |

---

## 🧠 Flujo del Agente (Mermaid)

```mermaid
graph TD
    A[POST /respuesta-analizada (recomendaciones)] --> B[Agente recibe texto (start-analysis-agent)]
    B --> C[Gemini analiza el texto]
    C --> D[Resultado retornado a recomendaciones]
    D --> E[Resultado guardado en BD]
```

