
const Header = () => {
    return (
        <div className="flex justify-between items-center shadow-sm p-5">
            <div>LOGO</div>
            <div>
                <ul className="hidden md:flex gap-2 ">
                    <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">Accueil</li>
                    <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary"></li>
                    <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary"></li>
                    <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">Contacts</li>
                </ul>
            </div>
            <div>AUTH</div>
        </div>
    );
}

export default Header;
