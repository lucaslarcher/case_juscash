from get_urls import  get_urls_pdf
from data_extract_pdf import process_pages
from transform_url_pdf import transform_url_pdf
from extract_data import extract_data_details

keywords = ["RPV", "pagamento pelo INSS"]

urls = get_urls_pdf()
print(urls)

# Acessa cada URL e realiza ações
for url in urls:
    urls_pages = transform_url_pdf(url)
    print(urls_pages)
    paragraphs = process_pages(urls_pages,keywords)
    for p in paragraphs:
        print(extract_data_details(p))

