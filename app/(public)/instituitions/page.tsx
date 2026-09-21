import { Instituitions } from "./Instituitions";
import styles from "./style.module.css";

export default function Page() {
    return (
        <main className={styles.instituitions}>
            <h2>instituitions</h2>
            <Instituitions />
        </main>
    )
}