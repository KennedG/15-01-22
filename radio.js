const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require("@discordjs/voice");
module.exports = {
    name: "radio",
    description: "Ouça nossa radio!!",

    run: async (client, interaction) => {
        const voice = interaction.member.voice.channel;
        const connection = joinVoiceChannel({
            channelId: voice.id,
            guildId: voice.guild.id,
            adapterCreator: voice.guild.voiceAdapterCreator,
        });
        const player = createAudioPlayer();
        const resource = createAudioResource("https://live.hunter.fm/pop2k_normal"); //API RADIO

        player.play(resource);

        connection.subscribe(player);
    },
};