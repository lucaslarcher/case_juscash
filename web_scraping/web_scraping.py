from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import Select
import time
from datetime import datetime

from data_extract_pdf import extract_data
from get_url_pdf import get_url_pdf

# Inicializa o Chrome automaticamente com o WebDriver Manager
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Acessa o site desejado
driver.get("https://dje.tjsp.jus.br/cdje/index.do")

# Aguardar o carregamento da página
time.sleep(2)

# Obtém a data de hoje e formata como dd/mm/aaaa
hoje = datetime.today().strftime('%d/%m/%Y')

# Define a data de início para uma data específica
data_inicio = "19/11/2024"
driver.execute_script(f"document.getElementById('dtInicioString').value = '{data_inicio}'")

# Define a data final para hoje
data_fim = hoje
driver.execute_script(f"document.getElementById('dtFimString').value = '{data_fim}'")

# Localiza todos os elementos <select> com o id 'cadernos'
select_elements = driver.find_elements(By.ID, "cadernos")

# Seleciona o segundo <select> encontrado
if len(select_elements) > 1:
    # Cria um objeto Select para o segundo elemento
    select = Select(select_elements[1])  # Índice 1 para o segundo <select>
    select.select_by_visible_text("caderno 3 - Judicial - 1ª Instância - Capital - Parte I")

# Localiza o campo de entrada com o id 'procura' e insere a chave de busca
procura_input = driver.find_element(By.ID, "procura")
procura_input.send_keys('"RPV" E "pagamento pelo INSS"')

# Localiza o botão de pesquisa e clica nele
botao_pesquisar = driver.find_element(By.XPATH, "//input[@value='Pesquisar']")
botao_pesquisar.click()


# Aguardar alguns segundos para ver a ação
time.sleep(2)

# Cria um conjunto para armazenar os URLs únicos
urls = set()

while True:
    # Localiza todos os links <a> com o atributo title="Visualizar"
    links_visualizar = driver.find_elements(By.XPATH, "//a[@title='Visualizar']")

    # Para cada link encontrado, imprime o atributo onclick
    for link in links_visualizar:
        onclick_value = link.get_attribute('onclick')
        # Verifica se o onclick existe e tenta dividir pelo "return popup('"
        if onclick_value:
            # Divide a string com base nas aspas simples
            parts = onclick_value.split("'")
            if len(parts) > 1:
                url = parts[1]  # Pega o conteúdo entre as aspas simples
                urls.add(url)  # Adiciona o URL ao conjunto (removerá duplicatas)
    
    # Tenta localizar o link "Próximo>"
    try:
        proximo_link = driver.find_element(By.XPATH, "//a[contains(text(), 'Próximo>')]")
        
        # Clica no link "Próximo>"
        proximo_link.click()

        # Aguardar a página carregar antes de buscar novamente
        time.sleep(2)
    except:
        # Se não encontrar o link "Próximo>", sai do loop
        print("Não há mais páginas para navegar.")
        break

print(urls)

# Acessa cada URL e realiza ações
for url in urls:
    print(get_url_pdf(url))
    print(extract_data(get_url_pdf(url)))

# Aguardar alguns segundos para ver a ação
time.sleep(5)

# Fecha o navegador após a execução
driver.quit()
