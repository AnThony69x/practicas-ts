# Bitácora del Módulo "Prácticas" – Proyecto ExposIA

**Responsable:** Dwesk  
**Lenguaje y Framework:** TypeScript + NestJS  
**Objetivo del módulo:** Permitir al usuario practicar su exposición navegando entre slides y grabando su voz. El sistema registra la navegación, guarda el audio, divide el contenido en fragmentos, y permite dejar notas por slide. Todo esto se prepara para ser analizado por IA en otro módulo.

---

## Estructura de datos (entidades propias)

1. **grabacion**  
   Registra el audio y vínculo con el usuario/presentación.

2. **navegacion_slide**  
   Guarda los cambios de slide durante la práctica, con timestamp relativo a la grabación.

3. **fragmento_audio**  
   Se genera automáticamente según los tiempos entre cada navegación; sirve para análisis detallado por slide.

4. **historial_practica**  
   Guarda la duración, inicio, fin y si fue terminada.

5. **nota_slide**  
   Permite que el usuario escriba notas por slide durante su práctica.

---

## Lógica de fragmentación

- Al comenzar la grabación, se crea el primer `fragmento_audio`.
- Cada vez que el usuario cambia de slide, se cierra el fragmento actual y se abre uno nuevo.
- Al finalizar la práctica, se cierra el último fragmento con la duración total del audio.

---

## Estado actual (última actualización)

✅ Definición final de entidades  
✅ Relación entre navegación y fragmentos corregida  
⏳ Falta generar `.entity.ts` y DTOs por carpeta  
⏳ Conexión de servicios y controladores pendiente  
❗ Base de datos PostgreSQL común a todos los módulos (por definir esquema final)

---

## Estructura del modulo
src/
├── controllers/               # Controladores por entidad
├── database/                  # Configuración de TypeORM o conexión PostgreSQL
├── models/                    # Entidades y DTOs
│   ├── *.entity.ts
│   ├── *.dto.ts
├── routes/                    # (Pendiente o para modularización futura)
├── services/                  # Lógica de negocio por entidad
├── app.ts                     # Configuración central de la app
├── server.ts                  # Punto de arranque personalizado
├── main.ts                    # (Evaluando eliminar si server.ts lo reemplaza)



# 27-5 

Se utilizo entidades externas solo definidas por el ID para evitar el crasheo de las entidades y sus relaciones // Estas entidades externas estan en la carpeta correspondiente dentro de models

//Se termino las 5 entidades con su DTOS 


npm install typeorm @nestjs/typeorm pg

hay que instalar el multer de express

El dto de grabaciones no se usa por ahora porque existe conflicto ya que al ser un modulo que maneja mp3 Eso es porque el @Body() en multipart se recibe como string plano y Nest no hace casting automático a number si el campo está acompañado de un archivo.

# 30-5 

Se cambio la arquitectura para definir Casos de Uso, asi el controlador solo llama a estos en vez de declarar toda la logica, se avanzo hasta crear fragmento de audio y navegacion slide

# 31-5

Ya con el modulo guardando fragmento audio guardando timestamps de inicio y fin procedemos a intalar 

npm install fluent-ffmpeg
npm install @ffmpeg-installer/ffmpeg

Ahora procedemos a mejorar el modulo para eu tome el archivo de grabacion, lea los timestamps de cada FragmentoAudio, cree un nuevo archivo .mp3 y actualice el campo archivo_fragmento


npm install @ffprobe-installer/ffprobe


para iniciar el proyecto

 docker compose up

 
Npm start

Para hacer el get general del modulo en Postman GET http://localhost:3000/debug/resumen/8

Para probar el test de todo el flujo DESDE LA CARPETA RAIZ PRACTICAS-TS npx ts-node test-practica.ts