"use client";

function AdminFooter() {

    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="admin">
            <p>&copy; nursingpastco {year}</p>
        </footer>
    )
}

export { AdminFooter }