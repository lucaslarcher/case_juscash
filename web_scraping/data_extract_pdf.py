from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from webdriver_manager.firefox import GeckoDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def extract_data(url):
    """
    Função que acessa uma URL, extrai os parágrafos de acordo com o valor de 'left' no estilo dos spans
    e retorna uma lista com os parágrafos.

    :param url: URL da página a ser acessada
    :return: Lista de parágrafos extraídos
    """

    # Definir opções para o Firefox (por exemplo, para rodar sem interface gráfica)
    firefox_options = Options()
    firefox_options.headless = False  # Defina como True para rodar sem abrir a interface do navegador

    # Configurar o driver com o GeckoDriverManager
    driver = webdriver.Firefox(service=Service(GeckoDriverManager().install()), options=firefox_options)

    # Abrir a página desejada
    driver.get(url)

    # Esperar até 10 segundos para garantir que a página carregue completamente
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "html"))  # Espera o elemento <html> carregar
    )

    # Esperar mais 2 segundos para garantir que o conteúdo carregue (ajustável conforme necessário)
    time.sleep(2)

    # Buscar todos os elementos <span> na página
    spans = driver.find_elements(By.TAG_NAME, 'span')

    # Inicializar uma variável para armazenar o parágrafo atual
    paragraphs = []
    current_paragraph = []

    # Iterar pelos spans e separar os parágrafos
    for span in spans:
        # Verificar se o span possui o atributo 'style' e extrair o valor de 'left'
        style = span.get_attribute('style')
        if style and 'left' in style:
            # Extrair o valor de left
            left_value = float(style.split('left:')[1].split('%')[0].strip())
            
            # Se o left for maior ou igual a 11.91%, consideramos como início de um novo parágrafo
            if left_value >= 11.91:
                # Se já houver um parágrafo em andamento, salvá-lo
                if current_paragraph:
                    paragraphs.append(" ".join(current_paragraph))
                    current_paragraph = []  # Reiniciar o parágrafo atual
            # Adicionar o texto do span ao parágrafo atual
            current_paragraph.append(span.text)

    # Adicionar o último parágrafo, se houver
    if current_paragraph:
        paragraphs.append(" ".join(current_paragraph))

    # Fechar o navegador
    driver.quit()

    # Retornar a lista de parágrafos
    return paragraphs
