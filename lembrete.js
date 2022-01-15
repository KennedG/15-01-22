const Discord = require('discord.js');
const ms = require("ms")

module.exports = {
    name: 'lembrete',
    aliases: ['alarme'],

    run: async(client, message, args) => {
        let time = args[0]
        if(!time) return message.channel.send("Por favor defina um  tempo")
        let lembrete = args.slice(1).join(" ")
        if(!lembrete) return message.channel.send(`Porfavor defina um lembrete`)

        const seliga = new Discord.MessageEmbed()
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setTitle (`Lembrete agendado`)
        .setColor('RANDOM') 
        .addField(`Irei lembrar você de:`, `\`${lembrete}\``, true)
        .addField("\nDaqui as", `\`${time}\``, true) 
        .setTimestamp(Date.now() + ms(time))
        .setFooter(`Lembrete será ocorrido `, client.user.displayAvatarURL())
        message.channel.send(seliga)

        setTimeout(() => {
            let cofoe = new Discord.MessageEmbed()
            .setTitle("Seu lembrete "  + message.author.username)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Você me pediu para criar um lembrete com as tais informações`)
            .setColor("RANDOM")
            .addField("Duração", `\`${time}\``, true)
            .addField(`\nLembrete:`, `\`${lembrete}\``, true)
            .setFooter(`Lembrete feito sucesso`, client.user.displayAvatarURL())
            message.channel.send(message.author, cofoe)
        }, ms(time))
    }
}