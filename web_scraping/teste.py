import re

def extract_case_details(text):
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


# Exemplo de uso
text = '''Processo 0016444-12.2024.8.26.0053 (processo principal 1010710-53.2023.8.26.0003) - Cumprimento de Sentença contra a Fazenda Pública - DIREITO PROCESSUAL CIVIL E DO TRABALHO - Hamilton Francisco - Vistos. 1) Homologação dos cálculos: Com a concordância da parte contrária (fls. 137), homologo os cálculos apresentados (fls. 133) e atualizados para 31/08/2024 (data-base), que correspondem ao importe total de R$ 175.681,78, composto pelas seguintes parcelas: R$ 128.897,79 - principal bruto/líquido; R$ 30.812,93 - juros moratórios; R$ 15.971,07 - honorários advocatícios. Os valores devem ser atualizados na data do efetivo pagamento pelo INSS. Ausente o interesse recursal, dá-se o trânsito em julgado deste item nesta data. 2) Peticionamento eletrônico do incidente processual: Nos termos do Comunicado SPI nº 03/2014, providencie a parte autora a instauração do incidente processual de requisição de pagamento (RPV ou Precatório) pelo sistema de peticionamento eletrônico (portal e-SAJ). Os valores do requisitório deverão ser discriminados e individualizados de acordo com a natureza de cada parcela (principal, juros de mora, honorários advocatícios), em conformidade estrita com a conta homologada e nos termos da presente decisão. Conforme o artigo 9º da Resolução nº 551/2011 do Órgão Especial do E. TJSP e art. 1.197, §§1º e 2º das NSCGJ, para a instrução e conferência do incidente processual, o(a) requerente deverá apresentar sua petição de requerimento com cópia dos seguintes documentos necessários para a expedição do ofício requisitório, devidamente separados e categorizados: documentos pessoais do(a) requerente (RG e CPF); procuração e substabelecimento(s) outorgado(s) ao longo do presente feito do(a) advogada(a) que assina a petição e que consta como beneficiário(a); memória(s) de cálculo completa dos valores homologados; decisão(ões) homologatória(s) dos valores devidos e a serem requisitados. demais peças que o(a) exequente julgar necessário. 3) Requisição do crédito do(a) advogado(a): A critério dos interessados, os valores devidos poderão ser requisitados conjuntamente, em um único incidente processual, ou requisitados de forma apartada, separando-se o valor do crédito principal (principal bruto/líquido + juros moratórios) e o valor da sucumbência, nos termos da Súmula Vinculante nº 47, hipótese em que os(as) exequentes deverão providenciar, em incidentes processuais distintos, a requisição do crédito do(a) autor(a) e dos valores devidos a título de honorários de sucumbência, sendo o primeiro formado em nome da parte autora e o último formado em nome do(a) advogado(a) requerente. Já os honorários advocatícios contratuais devem ser obrigatoriamente requisitados juntamente do principal, sob pena de configurar fracionamento. A Entidade Devedora é parte estranha ao contrato firmado entre o(a) exequente e seu(sua) advogado(a) (STF, RE 1.094.439 AgR, 2ª T, Rel. Min. DIAS TOFFOLI, j. 2.3.2018). Na hipótese de o(a) advogado(a) pretender a individualização dos honorários contratuais em campo próprio dentro do requisitório do crédito do(a) exequente, deverá apresentar planilha da conta, com a exata separação das verbas referentes ao principal bruto/ líquido, juros de mora, honorários sucumbenciais, honorários contratuais e demais verbas, e cópia do contrato nos autos deste Cumprimento de Sentença antes do peticionamento eletrônico do incidente processual, a fim de possibilitar o exercício da ampla defesa e do contraditório. 4) Individualização de requisitórios: Havendo mais de um credor, os ofícios de requisição deverão ser expedidos de modo individual por credor em requisições separadas, na proporção devida a cada um, ainda que exista litisconsórcio, bem como a planilha de cálculos e a documentação necessária igualmente deverão ser apresentadas de forma individualizada por credor, nos termos da Portaria nº 9.622/2018 (D.J.E. de 08/06/18) e do Comunicado Conjunto nº 1.212/2018 (D.J.E. de 22/06/18), que regulamentam a expedição dos requisitórios de pagamento no âmbito deste Tribunal. Para tanto, deverão os(as) exequentes apresentar, antes do peticionamento eletrônico do incidente processual e nos autos do Cumprimento de Sentença contra a Fazenda Pública, a competente planilha de cálculo, com a exata separação das verbas, individualizadas por credor, a fim de possibilitar a correta aferição pela parte contrária e por este Juízo do quinhão cabente a cada requerente ou litisconsorte. 5) Disposições finais: Defiro o prazo de 30 (trinta) dias para cumprimento. Devidamente instaurados os incidentes e requisitados os valores, aguarde-se o pagamento lançando-se o código SAJ nº 15.247, Após extinção do ultimo incidente pela quitação, estes autos deverão ser remetidos à conclusão para extinção da execução, nos termos do § 1º do art. 1.291 do provimento CGJ nº 29/2023). No silêncio a qualquer tempo, certifique-se e aguarde-se provocação no arquivo provisório (61614). Int. - ADV: ISABELA PAVANI (OAB 354091/SP)'''

result = extract_case_details(text)
print(result)
