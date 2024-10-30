# Guia de Contribuição

## Política de Branches

### Main

Essa é a branch que contém o código em **nível de produção**. É a branch que contém o código mais estável da aplicação:

- Branch raiz e única do projeto;
- Branch alvo para o deploy no Expo Go;

### Novas branches

Para desenvolvimento de novas funcionalidades, correções de bugs ou adição de documentações, crie uma nova branch **a partir da main**.

As novas branches devem ter uma issue associada e seguir o formato abaixo:

```
numeroDaIssue/nome-da-issue
```

Após concluir a atividade da nova branch, pode-se realizar um merge da branch com a main, através de *Pull Request*.

## Política de Commits

Os commits devem referenciar a issue correspondente, seguindo o formato:

```
#nºIssue - Descrição da ação em gerúndio
```

## Política de Issues

As issues devem ser adicionadas para apontar a atividade que está sendo realizada. 

A issue deve conter em seu corpo o Título, Descrição e Critérios de Aceitação. Além disso, deve-se associar uma label e também ser referenciada no quadro Kanban do Projects.
