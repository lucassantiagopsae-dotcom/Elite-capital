# Cloud, Integracoes e Tracking

Este arquivo define as regras de inteligencia para qualquer trabalho de cloud, integracoes, automacoes, pixels, eventos, webhooks, APIs e tracking dentro deste repositorio.

## Fonte principal de conhecimento

A base tecnica principal para qualquer implementacao de integracao ou tracking deve ser o repositorio:

```text
https://github.com/gustavokrob/krob-tracking-stack
```

Sempre que houver uma tarefa relacionada a integracoes, tracking ou infraestrutura de dados, consulte esse repositorio como referencia principal antes de decidir arquitetura, padroes, nomes, eventos, fluxos ou configuracoes.

## Regra central

Nenhuma integracao deve ser criada de forma improvisada.

Antes de implementar, alterar ou validar uma integracao, confirme:

1. Qual problema de negocio a integracao resolve.
2. Qual sistema envia dados.
3. Qual sistema recebe dados.
4. Quais eventos, campos e identificadores serao trafegados.
5. Qual padrao do `krob-tracking-stack` se aplica.
6. Quais variaveis, credenciais e segredos sao necessarios.
7. Como o fluxo sera testado antes de ir para producao.

## Prioridade das fontes

Quando houver duvida ou conflito entre fontes, use esta ordem:

1. Regras deste `cloud.md`.
2. Padroes e exemplos do `krob-tracking-stack`.
3. Documentacao oficial da ferramenta integrada.
4. Padroes ja existentes neste repositorio.
5. Decisao tecnica documentada no proprio arquivo, issue, commit ou pull request.

Se for necessario fugir do padrao do `krob-tracking-stack`, documente o motivo.

## Padrao para novas integracoes

Toda nova integracao deve ter, no minimo:

1. Nome da integracao.
2. Objetivo.
3. Sistemas envolvidos.
4. Tipo de integracao: API, webhook, pixel, server-side event, client-side event, automacao ou outro.
5. Fluxo de dados.
6. Lista de eventos ou acoes monitoradas.
7. Campos enviados.
8. Variaveis de ambiente necessarias.
9. Regras de seguranca.
10. Plano de teste.

## Tracking e eventos

Todo evento de tracking deve ser documentado antes de ser implementado.

Para cada evento, defina:

1. Nome do evento.
2. Gatilho que dispara o evento.
3. Origem do evento.
4. Destino do evento.
5. Campos obrigatorios.
6. Campos opcionais.
7. Identificadores usados.
8. Regras de consentimento, quando aplicavel.
9. Criterio de sucesso.
10. Como validar se o evento chegou corretamente.

Prefira eventos claros, consistentes e reutilizaveis. Evite nomes genericos como `click`, `submit` ou `conversion` sem contexto.

## Seguranca e credenciais

Nunca registre segredos diretamente no codigo ou em arquivos versionados.

Credenciais devem ser tratadas por variaveis de ambiente, cofres de segredo ou configuracoes seguras da plataforma usada.

Quando uma integracao precisar de credenciais, crie ou atualize um exemplo seguro usando `.env.example`, sem valores reais.

## Dados sensiveis

Nao envie dados sensiveis sem necessidade clara.

Antes de trafegar dados pessoais, confirme:

1. Se o dado e realmente necessario.
2. Se existe consentimento ou base legal aplicavel.
3. Se o dado pode ser minimizado, anonimizado ou hasheado.
4. Se o destino esta correto.
5. Se a exposicao em logs foi evitada.

## Server-side e client-side

Quando possivel, prefira tracking server-side para eventos criticos, especialmente conversoes, leads, compras, CRM e dados que precisam de maior confiabilidade.

Use tracking client-side quando a informacao depender do navegador, da sessao do usuario ou de interacoes de interface.

Quando usar ambos, documente como evitar duplicidade.

## Webhooks

Todo webhook deve considerar:

1. Validacao de assinatura ou token.
2. Idempotencia.
3. Retry.
4. Logs suficientes para auditoria.
5. Tratamento de erro.
6. Resposta rapida para o provedor.
7. Protecao contra payload invalido.

## APIs

Toda integracao via API deve considerar:

1. Autenticacao.
2. Rate limit.
3. Timeout.
4. Retry com criterio.
5. Tratamento de erros.
6. Versionamento da API.
7. Campos obrigatorios e opcionais.
8. Logs sem dados sensiveis.

## Checklist antes de finalizar

Antes de considerar uma integracao pronta, valide:

1. O padrao do `krob-tracking-stack` foi consultado.
2. O fluxo esta documentado.
3. Os eventos estao nomeados corretamente.
4. Os campos enviados foram revisados.
5. As credenciais nao foram expostas.
6. O ambiente de teste foi usado quando disponivel.
7. Existe criterio claro de sucesso.
8. O teste final foi documentado.

## Comportamento esperado da IA

Quando uma IA ou agente trabalhar neste repositorio e receber uma tarefa sobre integracoes, tracking, cloud, pixels, tags, eventos, webhooks ou APIs, ela deve:

1. Ler este arquivo primeiro.
2. Usar o `krob-tracking-stack` como base de conhecimento tecnica principal.
3. Evitar inventar arquitetura sem consultar a referencia.
4. Explicar quando estiver seguindo um padrao do repositorio de referencia.
5. Registrar qualquer excecao ou adaptacao relevante.

