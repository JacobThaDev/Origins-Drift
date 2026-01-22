const RuleCard = ({ number, title, message, color, icon }: RuleCardsTypes) => {

    const iconBg     = `bg-${color}/10`;
    const textColor  = `text-${color}`;
    const iconBorder = `border-${color}/30`;
    
    return (
        <div className={`bg-card relative flex flex-col md:flex-row items-start gap-6 border-2 border-border transition-all p-6 rounded-xl`}>
            <div className="absolute right-6">
                <p className="text-6xl font-black text-secondary font-mono">
                    {number < 10 ? "0"+number : number}
                </p>
            </div>
            <div>
                <div className={`w-14 h-14 ${iconBg} border-2 ${textColor} ${iconBorder} flex items-center justify-center rounded-lg`}>
                    {icon && icon}
                </div>
            </div>
            <div className="relative">
                <p className={`font-bold ${textColor} mb-2`}>
                    Rule {number < 10 ? "0"+number : number}
                </p>
                <p className="font-bold text-xl mb-4">
                    {title}
                </p>

                <p className="text-muted">
                    {message}
                </p>
            </div>
        </div>
    )
}

interface RuleCardsTypes {
    number: number;
    title:string;
    message:string;
    color:string;
    icon?: any;
}

export default RuleCard;