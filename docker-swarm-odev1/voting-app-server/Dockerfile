#node'un official image'ini kullanin. versiyon 8
FROM node:8

#uygulama 3000 portunu kullaniyor
EXPOSE 3000
#node'un uygulamayi yukleyecegimiz dizinine gidecegiz.
#/usr/src/app
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

#tum dosyalari kopyalayalim
COPY . .

#npm install ile gerekli kutuphaneleri yukleyelim
RUN npm install

#son olarak calistiralim
CMD [ "node", "server.js" ]
