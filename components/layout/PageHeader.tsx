import Container from "../layout/Container"

const PageHeader = ({ gradient = true, children }: { gradient?:boolean, children?:any }) => {

    return(
        <div className="relative py-40 pb-20">
            {gradient && 
                <div className="absolute top-0 bottom-0 w-full bg-gradient-to-b from-info/[8%] to-background"/>}

            <Container>
                <div className="max-w-7xl mx-auto text-center relative">
                    {children}
                </div>
            </Container>
        </div>
    )
}

export default PageHeader;