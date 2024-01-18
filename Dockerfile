#FROM dtr.metlife.com/infra/nginx:alpine
FROM dtr.metlife.com/infra/httpd:2.4.57
# Create non root user and set as process owner
#RUN adduser --uid 10000 --disabled-password nonroot
#USER 10000

WORKDIR /app
#COPY  ./docker-output/client-app .
#Copy ci-dashboard-dist
#COPY ./docker-output/client-app  /usr/share/nginx/html


#COPY build/ /usr/share/nginx/html 
COPY build/ /usr/local/apache2/htdocs/


#Copy default nginx configuration
#COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200 80
#test
#ENTRYPOINT ["index.html"]