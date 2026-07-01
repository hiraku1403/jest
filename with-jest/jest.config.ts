import type { Config } from "jest";

const config: Config = {
  // Ambiente jsdom simula o DOM do navegador
  testEnvironment: "jsdom",

  // Executa o setup após o framework Jest estar carregado
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Encontra todos os arquivos de teste em __tests__/
  testMatch: ["**/__tests__/**/*.test.{ts,tsx}"],

  // Transforma TS/TSX via Babel (necessário para JSX e imports)
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": [
      "babel-jest",
      { configFile: "./babel.test.config.json" },
    ],
  },

  // Resolve o alias @/* para src/*
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    // CSS Modules retornam objeto vazio nos testes
    "\\.module\\.css$": "<rootDir>/src/__mocks__/styleMock.ts",
  },

  // Arquivos incluídos no relatório de cobertura
  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx}",
    "src/hooks/**/*.{ts,tsx}",
    "src/app/page.tsx",
    "!src/**/*.d.ts",
  ],
};

export default config;
