python3 manage.py migrate && \
  nginx && \
  uwsgi --socket 0.0.0.0:8011 --wsgi-file taskbird/wsgi.py 
