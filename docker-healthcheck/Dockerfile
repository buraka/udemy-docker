FROM nginx:latest
RUN apt-get update && apt-get install -y curl

HEALTHCHECK --interval=3s --timeout=3s CMD curl localhost || exit 1
EXPOSE 80

