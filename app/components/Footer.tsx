"use client";

function Footer() {

    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer>
            <p>&copy; nursingpastco {year}</p>
        </footer>
    )
}

export { Footer }