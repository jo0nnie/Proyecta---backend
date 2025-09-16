# Usamos una imagen base de Node.js versión 20 sobre Alpine Linux (ligera)
FROM node:20-alpine3.16

# Definimos el directorio de trabajo dentro del contenedor (todo se ejecutará desde /app)
WORKDIR /app

# Copiamos los archivos de dependencias (package.json y package-lock.json) al contenedor
COPY package*.json ./

# Instalamos las dependencias del proyecto dentro del contenedor
RUN npm install 

# Copiamos el resto de los archivos del proyecto al contenedor
COPY . .

# Indicamos el comando por defecto que se ejecutará cuando el contenedor arranque
CMD ["npm", "start"]