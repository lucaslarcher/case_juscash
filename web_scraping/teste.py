import re
from datetime import datetime

# Exemplo de texto fornecido
texto = '''Publicação Oficial do Tribunal de Justiça do Estado de São Paulo - Lei Federal nº 11.419/06, art. 4º Disponibilização: terça-feira, 19 de novembro de 2024
...
Processo 0012617-90.2024.8.26.0053/02 - Requisição de Pequeno Valor - Auxílio-Acidente (Art. 86) - Marco Antonio Matos de Souza - INSS - INSTITUTO NACIONAL DO SEGURO SOCIAL - Ciência ao credor de que foi expedido o MLE, facultado eventual manifestação no prazo de dez dias - ADV: JOYCE SOARES DA SILVA (OAB 362246/SP)
'''

# Expressão regular para capturar as informações
processo_pattern = r'Processo (\d{4,}-\d{2,}\.\d{4}\.\d{1,}\.\d{4}\.\d{1,})'
data_pattern = r'Disponibilização:.*?(\d{1,2}\sde\s\w+\sde\s\d{4})'
autor_pattern = r'([A-Za-z\s]+) - INSS'
advogado_pattern = r'ADV: ([A-Za-z\s]+ \(OAB\s\d{1,}/[A-Z]{2}\))'
valor_pattern = r'R\$\s([\d\.,]+)'


# Função para buscar as informações no texto
def extrair_info(texto):
    processo = re.search(processo_pattern, texto)
    data_disponibilizacao = re.search(data_pattern, texto)
    autor = re.search(autor_pattern, texto)
    advogado = re.findall(advogado_pattern, texto)
    valores = re.findall(valor_pattern, texto)

    info = {
        "Número do Processo": processo.group(1) if processo else "Não encontrado",
        #"Data de Disponibilização": datetime.strptime(data_disponibilizacao.group(1), '%d de %B de %Y').strftime(
            #'%Y-%m-%d') if data_disponibilizacao else "Não encontrado",
        "Autor(es)": autor.group(1) if autor else "Não encontrado",
        "Valor Principal Bruto/Líquido": valores[0] if valores else "Não encontrado",
        "Valor dos Juros Moratórios": valores[1] if len(valores) > 1 else "Não encontrado",
        "Honorários Advocatícios": valores[2] if len(valores) > 2 else "Não encontrado",
        "Advogado(s)": advogado if advogado else "Não encontrado"

    }

    return info


# Exemplo de uso
informacoes = extrair_info(texto)
for chave, valor in informacoes.items():
    print(f"{chave}: {valor}")
