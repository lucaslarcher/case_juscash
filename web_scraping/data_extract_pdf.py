from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from webdriver_manager.firefox import GeckoDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def extract_data_by_keyword(url):
    """
    Função que acessa uma URL, extrai os spans com base na palavra 'Processo'
    e os agrupa em strings separadas até encontrar novamente a palavra 'Processo'.

    :param url: URL da página a ser acessada
    :return: Lista de strings extraídas
    """
    # Configuração do navegador
    firefox_options = Options()
    firefox_options.headless = False  # Alterar para True para rodar sem interface gráfica
    driver = webdriver.Firefox(service=Service(GeckoDriverManager().install()), options=firefox_options)

    # Abrir a página
    driver.get(url)

    # Garantir que a página carregue completamente
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "html")))
    time.sleep(2)

    # Buscar spans
    spans = driver.find_elements(By.TAG_NAME, 'span')

    # Agrupar textos
    grouped_texts = []
    current_group = []
    found_processo = False

    for span in spans:
        text = span.text.strip()

        # Se tem Processo ele cria uma nova string
        if "Processo" in text:
            found_processo = True
            grouped_texts.append(" ".join(current_group))
            current_group = []

        if found_processo:
            current_group.append(text)

    if current_group:
        grouped_texts.append(" ".join(current_group))

    driver.quit()
    return grouped_texts


def filter_paragraphs_by_keywords(paragraphs, keywords):
    """
    Filtra os parágrafos, mantendo apenas aqueles que contêm todas as palavras-chave.

    :param paragraphs: Lista de strings (parágrafos) a serem filtrados
    :param keywords: Lista de palavras-chave a serem buscadas
    :return: Lista de parágrafos filtrados
    """
    filter_paragraphs = []
    for paragraph in paragraphs:
        find = True
        for keyword in keywords:
            if paragraph.find(keyword) == -1:
                find = False
        if find:
            filter_paragraphs.append(paragraph)
    return filter_paragraphs


def get_next_page_url(current_url):
    """
    Incrementa o valor de `nuSeqpagina` em um URL usando split.

    :param current_url: URL atual com o parâmetro `nuSeqpagina`
    :return: URL da próxima página com `nuSeqpagina` incrementado
    """
    # Dividir a URL para localizar o parâmetro `nuSeqpagina`
    base_url, param_part = current_url.split("nuSeqpagina=", 1)

    # Separar o valor atual de `nuSeqpagina` do restante da query
    current_page, rest = param_part.split("&", 1)

    # Incrementar o valor de `nuSeqpagina`
    next_page = int(current_page) + 1

    # Reconstruir a URL com o novo valor de `nuSeqpagina`
    next_url = f"{base_url}nuSeqpagina={next_page}&{rest}"

    return next_url

def process_pages(url, keywords):
    """
    Processa a URL recebida para obter os parágrafos da página inicial,
    aplica o filtro de palavras-chave e retorna os parágrafos filtrados.

    :param url: URL inicial
    :param keywords: Lista de palavras-chave para filtrar os parágrafos
    :return: Lista de parágrafos filtrados
    """
    # Obter os parágrafos da primeira página
    first_page_paragraphs = extract_data_by_keyword(url)

    # Descobrir a URL da próxima página
    #next_url = get_next_page_url(url)

    # Obter os parágrafos da próxima página
    #second_page_paragraphs = extract_data_by_keyword(next_url)

    # Combinar os parágrafos das duas páginas
    #combined_paragraphs = first_page_paragraphs + second_page_paragraphs

    # Filtrar os parágrafos combinados com base nas keywords
    filtered_paragraphs = filter_paragraphs_by_keywords(first_page_paragraphs, keywords)

    return filtered_paragraphs