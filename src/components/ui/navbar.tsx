import ThemeToggle from "./themetoggle";

export default function Navbar(){
    return (
        <nav className="z-50 lg:sticky max-w-[90%] m-auto lg:top-0">
            <section className="flex w-full justify-between items-center m-auto p-2">
                <div className="flex items-center justify-center font-poppins font-semibold text-xl">
                    Typing Master
                </div>

                <div className="flex items-center gap-4 cursor-pointer">
                    <ThemeToggle />
                </div>
            </section>

            </nav>
    )
}