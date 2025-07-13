# Evaluación N°4: Programación Front End (TI2031)

---

## Información Académica

- **Área:** Tecnologías de la información y ciberseguridad  
- **Carrera:** Analista Programador  
- **Asignatura:** Programación Front End (Código TI2031)  
- **Sede:** San Pedro de la Paz  
- **Docente:** German Mardones  
- **Fecha de entrega:** 14/07/2025  

---

## Descripción de la Problemática

En el contexto actual, muchos usuarios interesados en el mundo financiero requieren una herramienta simple y práctica para gestionar su portafolio de inversiones personales. Las plataformas existentes pueden ser complejas o depender de servicios externos con costos y limitaciones. 

Esta aplicación busca ofrecer una solución accesible que permita a cualquier persona registrar, editar y visualizar sus inversiones en activos digitales (principalmente criptomonedas), con precios actualizados en tiempo real, y con persistencia local para evitar pérdidas de datos.

---

## Solución Propuesta

Se desarrolló una **Single Page Application (SPA)** utilizando el framework **Vue 3** junto con **Vite** para la construcción rápida y eficiente.

La aplicación cuenta con:

- Componentes reutilizables que estructuran la funcionalidad y presentación.
- Funcionalidad completa de **CRUD** (Crear, Leer, Actualizar y Eliminar) usando `localStorage` para mantener la persistencia de datos en el navegador sin necesidad de backend.
- Consumo de una API pública (CoinCap) para obtener los precios actualizados de criptomonedas, integrando esta información para calcular el valor real de cada inversión.
- Interfaz intuitiva que permite al usuario ingresar la cantidad de activos, visualizar los cambios y administrar su portafolio sin recargar la página.

---

## Instrucciones de Uso

### Requisitos Previos

- Node.js instalado  
- npm (viene con Node.js)  
- Navegador web moderno  

### Instalación y Ejecución Local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/G0G4m/EV4_Frontend.git
   cd EV4_Frontend
