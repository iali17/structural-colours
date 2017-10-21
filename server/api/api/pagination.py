from rest_framework.pagination import (
    PageNumberPagination
)

class PicturePageNumberPagination(PageNumberPagination):
    page_size = 24
