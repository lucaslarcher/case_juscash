from get_urls import  get_urls_pdf
from data_extract_pdf import extract_data
from transform_url_pdf import transform_url_pdf


urls = get_urls_pdf()
print(urls)

# Acessa cada URL e realiza ações
for url in urls:
    print(transform_url_pdf(url))
    print(extract_data(transform_url_pdf(url)))

