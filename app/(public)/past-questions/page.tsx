import { PastQuestions } from "./PastQuestions";
import styles from "./styles.module.css";

export default function Page() {

    return (
        <main className={styles.past}>
            <h2>past questions</h2>
            <PastQuestions />
        </main>
    )
}