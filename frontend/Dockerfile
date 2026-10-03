# The UI is a prebuilt bundle (public/assets), so no Node build stage is needed yet.
# When frontend/src is ported to real source, add a node build stage and copy /app/dist instead.
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY public/ /usr/share/nginx/html/
EXPOSE 80
