"""
ASGI config for gaiaProject project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

# Set the default Django settings module before importing Django components
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gaiaProject.settings')

# Now import the required Django and Channels components
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from gaiaApp.routing import websocket_urlpatterns

# Define the application with ProtocolTypeRouter
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(websocket_urlpatterns)),
})
