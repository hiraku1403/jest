// app/page.tsx
// Server Component: carrega tarefas com await e passa para o Client Component
import { getTarefas } from "@/data/tarefas";
import ListaDeTarefas from "@/components/ListaDeTarefas";
import styles from "./page.module.css";

// SSG: pré-renderizado em build (force-static)
export const dynamic = "force-static";

export default async function HomePage() {
  // Busca assíncrona dos dados — Server Component com await
  const tarefas = await getTarefas();

  return (
    <main className={styles.pagina} data-testid="pagina-principal">
      <header className={styles.header}>
        <h1 className={styles.titulo}>Minhas Tarefas</h1>
        <p className={styles.subtitulo}>
          Organize, acompanhe e conclua — uma tarefa por vez.
        </p>
      </header>

      <div className={styles.card}>
        {/* Client Component recebe dados do servidor via props */}
        <ListaDeTarefas tarefasIniciais={tarefas} />
      </div>
    </main>
  );
}
