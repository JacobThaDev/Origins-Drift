const BOT_TOKEN   = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID    = process.env.DISCORD_GUILD_ID;

// eslint-disable-next-line
export async function GET(req: any, res:any) {
    try {
        const guild = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}`, {
            headers: {
                Authorization: `Bot ${BOT_TOKEN}`,
            } ,
            next: { revalidate: 3600 }
        });

        const guildData = await guild.json();

        return Response.json(guildData);
    } catch (e:any) {
        return Response.json({
            error: e.message
        });
    }
}