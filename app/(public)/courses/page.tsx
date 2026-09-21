import Courses from "./Courses";
import styles from "./courses.module.css";

export default function Page() {
    return (
        <main className={styles.courses}>
            <h2>Courses</h2>
            <Courses />
        </main>
    )
}