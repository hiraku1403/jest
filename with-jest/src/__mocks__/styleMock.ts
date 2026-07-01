// styleMock.ts
// CSS Modules retornam um Proxy que devolve o nome da chave como string.
// Isso evita erros de "undefined" ao acessar styles.qualquerCoisa nos testes.
const handler: ProxyHandler<object> = {
  get: (_target, prop) => String(prop),
};
const styleMock = new Proxy({}, handler);
export default styleMock;
