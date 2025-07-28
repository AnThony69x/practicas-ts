import axios from 'axios';
import * as fs from 'fs';
import * as FormData from 'form-data';
import * as dotenv from 'dotenv';
dotenv.config();

const api = 'http://localhost:3000';
const audioPath = './1mb.mp3';
const reportePath = './reporte-practica.txt';
const token = process.env.API_KEY ?? 'mi-token-seguro';

const log: string[] = [];

function registrarLinea(linea: string) {
  console.log(linea);
  log.push(linea);
}

function guardarReporte() {
  fs.writeFileSync(reportePath, log.join('\n'), 'utf-8');
  console.log(`\n📄 Reporte guardado en: ${reportePath}`);
}

async function subirGrabacion() {
  registrarLinea('\n🎤 Subiendo grabación...');
  const form = new FormData();
  form.append('usuario_id', '4');
  form.append('presentacion_id', '3');
  form.append('archivo_audio', fs.createReadStream(audioPath));
  form.append('nombreArchivo', 'test-audio.mp3');

  const response = await axios.post(`${api}/grabacion/subir`, form, {
    headers: {
      ...form.getHeaders(),
      Authorization: `Bearer ${token}`,
    },
  });

  registrarLinea(`✅ Grabación subida: ID=${response.data.id}`);
  return response.data.id;
}

async function crearNavegaciones(grabacion_id: number) {
  registrarLinea('\n🧭 Registrando navegación por slides...');
  const eventos = [
    { slide_id: 1, timestamp: 0, tipo_navegacion: 'inicio' },
    { slide_id: 2, timestamp: 5000, tipo_navegacion: 'siguiente' },
    { slide_id: 3, timestamp: 10000, tipo_navegacion: 'siguiente' },
    { slide_id: 4, timestamp: 15000, tipo_navegacion: 'siguiente' },
  ];

  for (const evento of eventos) {
    await axios.post(`${api}/navegacion-slide`, { grabacion_id, ...evento }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    registrarLinea(`✔️ Evento: slide ${evento.slide_id}, ts=${evento.timestamp}, tipo=${evento.tipo_navegacion}`);
  }
}

async function crearNotas(grabacion_id: number) {
  registrarLinea('\n📝 Añadiendo notas a cada slide...');
  const notas = [
    { slide_id: 1, timestamp: 1000 },
    { slide_id: 2, timestamp: 6000 },
    { slide_id: 3, timestamp: 11000 },
    { slide_id: 4, timestamp: 16000 },
  ];

  for (const nota of notas) {
    const response = await axios.post(`${api}/nota-slide`, {
      grabacion_id,
      slide_id: nota.slide_id,
      contenido: `Nota generada para slide ${nota.slide_id}`,
      timestamp: nota.timestamp,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    registrarLinea(`📝 Nota para slide ${nota.slide_id} creada: ID=${response.data.id}`);
  }
}

async function crearFragmentos(grabacion_id: number) {
  registrarLinea('\n🎧 Generando fragmentos por slide...');
  const fragmentos = [
    { slide_id: 1, inicio: 0, fin: 5 },
    { slide_id: 2, inicio: 5, fin: 10 },
    { slide_id: 3, inicio: 10, fin: 15 },
    { slide_id: 4, inicio: 15, fin: 20 },
  ];

  for (const frag of fragmentos) {
    const dto = {
      grabacion_id,
      slide_id: frag.slide_id,
      inicio_segundo: frag.inicio * 1000,
      fin_segundo: frag.fin * 1000,
    };

    const response = await axios.post(`${api}/fragmento-audio`, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    registrarLinea(`🎧 Fragmento slide ${frag.slide_id}: archivo=${response.data.ruta_archivo}`);
  }
}

async function registrarHistorial(grabacion_id: number) {
  registrarLinea('\n📘 Registrando historial de práctica...');
  const response = await axios.post(`${api}/api/historial-practica`, {
    grabacion_id,
    duracion_total: 74140,
    fecha_inicio: '2025-06-01T10:00:00.000Z',
    fecha_fin: '2025-06-01T10:15:00.000Z',
    finalizado: true,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  registrarLinea(`📘 Historial registrado con ID=${response.data.id}`);
}

async function main() {
  try {
    registrarLinea('🚀 Iniciando flujo de prueba del módulo de prácticas...');

    const grabacionId = await subirGrabacion();
    await crearNavegaciones(grabacionId);
    await crearNotas(grabacionId);
    await crearFragmentos(grabacionId);
    await registrarHistorial(grabacionId);

    registrarLinea('\n✅ Flujo completo ejecutado correctamente');
  } catch (err: any) {
    const errorMsg = err.response?.data ?? err.message;
    registrarLinea(`❌ ERROR: ${JSON.stringify(errorMsg)}`);
  } finally {
    guardarReporte();
  }
}

main();
