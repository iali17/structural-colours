"""
WSGI config for StructuralColour project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/howto/deployment/wsgi/
"""

import os
import sys
import logging
from django.core.wsgi import get_wsgi_application
sys.path.append("/var/www/structural-colour/server")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "StructuralColour.settings")
logging.basicConfig(stream=sys.stderr)
application = get_wsgi_application()
