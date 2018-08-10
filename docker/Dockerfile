FROM nginx
VOLUME /tmp
ENV LANG en_US.UTF-8
ADD ./examples/avue/ /usr/share/nginx/html/
RUN chmod -R 777 html/
EXPOSE 80
EXPOSE 443