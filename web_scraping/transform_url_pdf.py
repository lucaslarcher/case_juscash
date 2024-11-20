from urllib.parse import urlparse, parse_qs, urlencode

def transform_url_pdf(url):
    # Fazer o parsing da URL
    parsed_url = urlparse(url)

    # Extrair os parâmetros GET
    parametros = parse_qs(parsed_url.query)

    # Modificar ou gerar uma nova URL (se necessário, adicionando ou alterando parâmetros)
    novo_parametros = {
        'cdVolume': parametros.get('cdVolume', [''])[0],  # Extraímos o parâmetro cdVolume
        'nuDiario': parametros.get('nuDiario', [''])[0],  # Extraímos o parâmetro nuDiario
        'cdCaderno': parametros.get('cdCaderno', [''])[0],  # Extraímos o parâmetro cdCaderno
        'nuSeqpagina': parametros.get('nuSeqpagina', [''])[0],  # Extraímos o parâmetro nuSeqpagina
        'uuidCaptcha': ''  # Você pode adicionar ou alterar outros parâmetros
    }

    # Gerar nova URL com os parâmetros extraídos
    nova_query = urlencode(novo_parametros)
    nova_url = f"https://dje.tjsp.jus.br/cdje/getPaginaDoDiario.do?{nova_query}"

    return nova_url
