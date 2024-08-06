const { AoiClient } = require("aoi.js");


const client = new AoiClient({

    token: "your bot token",

    prefix: "-",

    intents: ["MessageContent", "Guilds", "GuildMessages","GuildMembers","GuildMessageReactions"],

    events: ["onMessage", "onLeave","onJoin","onInteractionCreate"],

    database: {

        type: "aoi.db",

        db: require("@akarui/aoi.db"),

        dbType: "KeyValue",

        tables: ["main"],

        securityKey: "a-32-characters-long-string-here"

    }

});



client.loadCommands("./commands/", true);


     const axios = require('axios');

client.command({
    name: 'serverstatus',
    code: `
    $djsEval[
        (async () => {
            const axios = require('axios');
            
            let msg = await d.message.channel.send('Fetching server status...');

            const fetchServerStatus = async () => {
                try {
                    const response = await axios.get('https://api.mcsrvstat.us/(your server ip)');
                    const data = response.data;
//use https://api.mcsrvstat.us/bedrock/ip:port
                    const embed = {
                        color: data.online ? 0x00FF00 : 0xFF0000,
                        title: 'Server Status',
                        description: data.online ? 
                            \`Server is online with \${data.players.online} players.\` : 
                            'Server is offline.',
                        timestamp: new Date()
                    };
                     
                    await msg.edit({ content: null, embeds: [embed] });
                } catch (error) {
                    const errorEmbed = {
                        color: 0xFF0000,
                        title: 'Error',
                        description: 'Error fetching server status.',
                        timestamp: new Date()
                    };
                    
                    await msg.edit({ content: null, embeds: [errorEmbed] });
                    console.error('Error fetching server status:', error);
                }
            };

            await fetchServerStatus();
            setInterval(fetchServerStatus, 30000);
        })();
    ]
    `
});

