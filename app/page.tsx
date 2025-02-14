import styles from "./page.module.css";
import "@bryntum/scheduler/scheduler.stockholm.css";

import { SchedulerWrapper } from "@/components/SchedulerWrapper";

export default function Home() {
  return (
    <main className={styles.main}>
      <SchedulerWrapper />
    </main>
  );
}
