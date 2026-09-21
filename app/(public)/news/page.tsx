import { News } from "./News";
import styles from "./news.module.css";

export default function Page() {
    return (
        <main className={styles.news}>
            <h2>news & updates</h2>
            <News />
        </main>
    )
}