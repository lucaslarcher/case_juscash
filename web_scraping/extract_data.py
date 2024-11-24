import re

def extract_data_details(text):
    """
    Extrai detalhes do processo a partir do texto fornecido.

    :param text: String contendo os detalhes do processo.
    :return: Dicionário com os dados extraídos.
    """
    details = {}

    # Extrair o número do processo
    process_match = re.search(r'\b\d{7}-\d{2}\.\d{4}\.\d{1,2}\.\d{2}\.\d{4}\b', text)
    details["process_number"] = process_match.group() if process_match else None

    # Extrair o autor
    author_split = text.split(" - ")
    details["author"] = author_split[3] if len(author_split) > 3 else None

    # Extrair advogados
    adv_match = re.search(r'ADV:\s*(.+)', text)
    details["advocates"] = adv_match.group(1).strip() if adv_match else None

    # Extrair valor principal bruto/líquido
    principal_match = re.search(r'R\$ [\d.,]+ - principal bruto/?líquido', text)
    details["principal_value"] = principal_match.group().split(" - ")[0] if principal_match else None

    # Extrair valor de honorários advocatícios
    honorarios_match = re.search(r'R\$ [\d.,]+ - honorários advocatícios', text)
    details["attorney_fees"] = honorarios_match.group().split(" - ")[0] if honorarios_match else None

    # Extrair juros moratórios
    juros_match = re.search(r'R\$ [\d.,]+ - juros moratórios', text)
    details["interest_value"] = juros_match.group().split(" - ")[0] if juros_match else None

    return details