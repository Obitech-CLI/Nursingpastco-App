import { Contents } from "./Contents";
import styles from "./contents.module.css";

export default function Page() {
    return (
        <main className={styles.content}>
            <h2>contents</h2>
            <Contents />
        </main>
    )
}