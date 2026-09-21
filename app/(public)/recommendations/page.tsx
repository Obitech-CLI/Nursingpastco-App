import { Recommendations } from "./Recommendations";
import styles from "./recommend.module.css";

export default function Page() {
    return (
        <main className={styles.recommendation}>
            <h2>recommendations</h2>
            <Recommendations />
        </main>
    )
}