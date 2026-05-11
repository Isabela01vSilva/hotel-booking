# 🏨 Hotel Booking

✅ Status: Concluído

Projeto desenvolvido como parte de um teste técnico, com o objetivo de construir uma aplicação moderna e responsiva para busca e reserva de hotéis.

---

## 🚀 Tecnologias Utilizadas

- Angular 19
- TypeScript
- RxJS
- Ngrx
- CSS
- Angular Router
- Angular Material
- Jasmine
- Karma

---

## 📚 Funcionalidades

- 🔍 Autocomplete de destinos com sugestões
- 🏨 Listagem de hotéis
- 📝 Página de detalhes com informações e galeria do hotel
- 🛏️ Seleção de quarto
- 📦 Checkout com formulário validado
- 📱 Layout responsivo para mobile, tablet e desktop

---

## 🎨 Design

O layout foi baseado no Figma disponibilizado no desafio técnico:

🔗 [Figma - Teste Front-end](https://www.figma.com/file/STp3w0nUeWrPkTzhMAtkEx/Teste-Front-end)

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura baseada em componentes reutilizáveis, separação de responsabilidades e gerenciamento de estado, visando escalabilidade e manutenção da aplicação.
  
---

## 📁 Estrutura de Pastas

```bash
src/
 ├── app/
 │    ├── _components/
 │    │    ├── base/
 │    │    ├── button/
 │    │    ├── card/
 │    │    ├── footer/
 │    │    ├── header/
 │    │    ├── hotel-filters/
 │    │    ├── room-option/
 │    │    └── search-engine/
 │    │         ├── inputs/
 │    │         │    ├── date-input/
 │    │         │    ├── destination-input/
 │    │         │    └── guest-input/
 │    │         ├── search-engine.component.html
 │    │         ├── search-engine.component.css
 │    │         └── search-engine.component.ts
 │    │
 │    ├── entity/
 │    │    ├── checkout-data.interface.ts
 │    │    ├── currency.interface.ts
 │    │    ├── hotel.interface.ts
 │    │    ├── room.interface.ts
 │    │    ├── search-input-data.interface.ts
 │    │    └── suggestions.interface.ts
 │    │
 │    ├── state/
 │    │    ├── checkout/
 │    │    ├── hotel/
 │    │    ├── search/
 │    │    └── suggestion/
 │    │
 │    ├── pages/
 │    │    ├── checkout/
 │    │    ├── detail/
 │    │    ├── home/
 │    │    ├── search/
 │    │    └── success/
 │    │
 │    ├── services/
 │    │
 │    └── environments/
 │
 └── assets/
```

---

## 📦 Como Executar o Projeto

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/seu-usuario/hotel-booking-angular19.git

cd hotel-booking-angular19
```

### 2️⃣ Instale as dependências

```bash
npm install
```

### 3️⃣ Inicie o servidor Angular

```bash
ng serve
```

---

## 🔌 Backend (API)

```bash
git clone https://github.com/enio-infotera/infotera-frontend-test-server.git

cd infotera-frontend-test-server

yarn install

yarn server
```
