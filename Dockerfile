FROM nginx:alpine
WORKDIR /app
#COPY  ./docker-output/client-app .
#Copy ci-dashboard-dist
#COPY ./docker-output/client-app  /usr/share/nginx/html
COPY build/ /usr/share/nginx/html 
#Copy default nginx configuration
#COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200 80
#test
#ENTRYPOINT ["index.html"]