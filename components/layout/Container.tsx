interface ContainerTypes {
    className?: string;
    id?: string;
    children?: React.ReactNode;
}

const Container = ({ children, id, className }: ContainerTypes) => {
    return(
        <div id={id} className={`mx-auto w-full max-w-[1350px] px-[2em] ${className}`}>
            {children}
        </div>
    )
}

export default Container;