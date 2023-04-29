import Logo from "../commons/logo-icon";

export default function Header() {
    return (
        <header>
            <div className="container">
                <div className="header">
                    <div className="header-logo">
                        <h1><Logo /></h1>
                    </div>
                    <div className="header-menu">
                        <nav>
                            <div className="header-menu-item">
                                <a href="#">About</a>
                            </div>
                            <div className="header-menu-item">
                                <a href="#">Works</a>
                            </div>
                            <div className="header-menu-item">
                                <a href="#">Contact</a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}