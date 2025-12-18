import { MenuIcon } from "../icons/MenuIcon";
import Container from "../layout/Container";
import Link from "next/link";
import links from '@/cfg/NavLinks';

const Navigation = () => {

    return(
        <div className="bg-black/20 absolute w-full z-[1000] top-[64px] h-[110px] flex items-center backdrop-blur">
            <Container>
                <div className="flex">
                    <div className="max-w-[250px] min-w-[250px] lg:h-[110px] relative flex items-center">
                         <p className="font-black text-3xl hidden lg:inline-block">Origins [DC]</p>
                         <p className="font-black text-3xl lg:hidden">Origins</p>
                     </div>
                    <div className="hidden w-full lg:flex justify-start gap-1">
                        {links[0].map((link:any, index:number) => {
                            return(
                                <NavLink key={index} url={link.url}>
                                    {link.title}
                                </NavLink>
                            )
                        })}
                     </div>
                     <div className="lg:hidden flex items-center ml-auto">
                        <MenuIcon height={30}/>
                     </div>
                </div>
            </Container>
        </div>
    );
}

const NavLink = ({ children, url, title }: {
    url: string;
    children?: React.ReactNode;
    title?:string;
}) => {

    return(
        <Link href={url}
            aria-label={title}
            className={`text-xl hover:text-warning text-white/80 flex items-center justify-center px-5 transition-all font-bold`}>
            {children}
        </Link>
    )
    
}

export default Navigation;